import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DEFAULT_ERROR = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

export default function Register() {
  const [nome, setNome] = useState(""); // acrescentei nome e sobrenome
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //aguarda as mensagens de erro de validacao
  const [error, setError] = useState(DEFAULT_ERROR);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let temErro = false;

    const errors = structuredClone(DEFAULT_ERROR);

    //validação do nomme
    if (!nome) {
      errors.name = "O nome é obrigatório.";
      temErro = true;
    }

    //validaçao do sobrenome
    if (!sobrenome) {
      errors.surname = "O sobrenome é obrigatório.";
      temErro = true;
    }

    //validação email
    if (!email) {
      errors.email = "O e-mail é obrigatório.";
      temErro = true;
    } else if (!email.includes("@") || !email.includes(".")) {
      errors.email = "Insira um e-mail válido";
      temErro = true;
    }

    //validaçao senha
    if (!password) {
      errors.password = "A senha é obrigatória";
      temErro = true;
    } else if (password.length < 6) {
      errors.password = "A senha deve ter no mínimo 6 caracteres.";
      temErro = true;
    }

    if (temErro) {
      setError(errors);
      return;
    }

    setError(DEFAULT_ERROR);

    //feedback positivo
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Cadastro realizado com sucesso:", { nome, sobrenome, email, password });
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white text-slate-900 font-sans">
      {/* -------------------- ESQUERDA ------------------------- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative bg-white">
        <div className="absolute top-8 left-8 sm:left-16 lg:left-24">
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
          >
            Voltar para o Login
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Cadastro</h1>
          <p className="text-sm text-slate-500 mb-8">
            Insira suas informações para acessar a plataforma
          </p>

          {/* Função handleSubmit do formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Bloco contendo Nome e Sobrenome lado a lado */}
            <div className="flex gap-4">
              {/* Caixa de Nome */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex.: Marcia"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all
                    ${error.name ? "border-red-500 focus:ring-red-500" : "border-slate-200"}`}
                />
                {error.name && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error.name}
                  </p>
                )}
              </div>

              {/* Caixa de Sobrenome */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Sobrenome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Santos"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all
                    ${error.surname ? "border-red-500 focus:ring-red-500" : "border-slate-200"}`}
                />
                {error.surname && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error.surname}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="seunome@empresa.org.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all
                  ${error.email ? "border-red-500 focus:ring-red-500" : "border-slate-200"}`}
              />
              {error.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error.email}
                </p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Senha <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all pr-11
                    ${error.password ? "border-red-500 focus:ring-red-500" : "border-slate-200"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error.password && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error.password}
                </p>
              )}
            </div>

            {/* Botão enviar */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-400-hover disabled:bg-orange-300 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors text-sm disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Já possui uma conta?{" "}
            <Link
              to="/"
              className="font-medium text-orange-600 hover:text-orange-400 transition-colors"
            >
              Faça login aqui.
            </Link>
          </p>
        </div>
      </div>

      {/*--------------------------------DIREITA--------------------------------------------------*/}
      <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center relative p-12">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>

        <div className="text-center relative z-10 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-400 text-white font-bold text-2xl shadow-xl mb-6">
            HD
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">HelpDesk</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Plataforma centralizada para registro e acompanhamento de solicitações de suporte
            técnico
          </p>
        </div>
      </div>
    </div>
  );
}
