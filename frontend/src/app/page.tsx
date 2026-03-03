"use client";

import { useState, useEffect, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

interface Documento {
  id: string;
  titulo: string;
  descricao: string | null;
  status: string;
  criado_em: string;
}

export default function Home() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erroForm, setErroForm] = useState<string | null>(null);

  const carregarDocumentos = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const res = await fetch(`${API_URL}/documentos`);
      if (!res.ok) throw new Error("Falha ao carregar documentos");
      const data = await res.json();
      setDocumentos(data);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDocumentos();
  }, [carregarDocumentos]);

  async function handleCriar(e: React.FormEvent) {
    e.preventDefault();
    setErroForm(null);
    const t = titulo.trim();
    if (!t) {
      setErroForm("Título é obrigatório.");
      return;
    }
    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/documentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: t, descricao: descricao.trim() || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Falha ao criar documento");
      }
      setTitulo("");
      setDescricao("");
      await carregarDocumentos();
    } catch (e) {
      setErroForm(e instanceof Error ? e.message : "Erro ao criar");
    } finally {
      setEnviando(false);
    }
  }

  async function handleAlterarStatus(id: string, novoStatus: string) {
    try {
      const res = await fetch(`${API_URL}/documentos/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      });
      if (!res.ok) throw new Error("Falha ao atualizar status");
      await carregarDocumentos();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao atualizar status");
    }
  }

  async function handleExcluir(id: string) {
    if (!confirm("Excluir este documento?")) return;
    try {
      const res = await fetch(`${API_URL}/documentos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Falha ao excluir");
      await carregarDocumentos();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao excluir");
    }
  }

  return (
    <>
      <h1>SuperSign – Documentos</h1>

      <form onSubmit={handleCriar}>
        <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>Novo documento</h2>
        <label htmlFor="titulo">Título *</label>
        <input
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex: Contrato de prestação de serviços"
          disabled={enviando}
        />
        <label htmlFor="descricao">Descrição (opcional)</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={2}
          disabled={enviando}
        />
        <button type="submit" disabled={enviando}>
          {enviando ? "Criando…" : "Criar documento"}
        </button>
        {erroForm && <p className="erro">{erroForm}</p>}
      </form>

      <h2 style={{ fontSize: "1.1rem" }}>Lista de documentos</h2>
      {erro && <p className="erro">{erro}</p>}
      {loading ? (
        <p className="carregando">Carregando…</p>
      ) : (
        <ul>
          {documentos.length === 0 ? (
            <li>Nenhum documento cadastrado.</li>
          ) : (
            documentos.map((doc) => (
              <li key={doc.id}>
                <div className="info">
                  <strong>{doc.titulo}</strong>
                  {doc.descricao && <span>{doc.descricao}</span>}
                  <small>
                    {new Date(doc.criado_em).toLocaleString("pt-BR")}
                  </small>
                </div>
                <div>
                  <span className={`status ${doc.status}`}>{doc.status}</span>
                  <select
                    value={doc.status}
                    onChange={(e) => handleAlterarStatus(doc.id, e.target.value)}
                    aria-label="Alterar status"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="assinado">Assinado</option>
                  </select>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleExcluir(doc.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
}
