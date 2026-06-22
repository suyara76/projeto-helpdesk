import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //aguarda as mensagens de erro de validacao
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let temErro = false;

    //validação email
    if (!email) {
      setEmailError("O e-mail é obrigatório.");
      temErro = true;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Insira um e-mail válido");
      temErro = true;
    }

    //validaçao senha
    if (!password) {
      setPasswordError("A senha é obrigatória");
      temErro = true;
    } else if (password.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres.");
      temErro = true;
    }

    if (temErro) {
      toast("Erro no formulario");
      return;
    }

    //feedback positivo
    try {
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Dados enviados com sucesso:", { email, password });
    } catch (error) {
      console.error("Erro ao autenticar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white text-slate-900 font-sans">
      {/* --------------------ESQUERDA -------------------------*/}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative bg-white">
        <div className="absolute top-8 left-8 sm:left-16 lg:left-24">
          <button
            type="button"
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
          >
            Voltar para Home
          </button>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Login</h1>
          <p className="text-sm text-slate-500 mb-8">
            Insira seu e-mail e senha cadastrados para acessar sua conta
          </p>

          {/*funçao handleSubmit do formulário*/}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/*email*/}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="seunome@empresa.org.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)} //atualiza o estado
                className={cn(
                  "w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all border-slate-200",
                  emailError && "border-red-500 focus:ring-red-500",
                )}
              />
              {emailError && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {emailError}
                </p>
              )}
            </div>

            {/*senha*/}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Senha <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-orange-600 hover:text-orange-400 transition-colors"
                >
                  Esqueci senha
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all pr-11 border-slate-200",
                    passwordError && "border-red-500 focus:ring-red-500",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {passwordError}
                </p>
              )}
            </div>

            {/*botao enviar*/}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm cursor-pointer transition-colors text-sm disabled:cursor-not-allowed"
            >
              Entrar
              {isSubmitting && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Não tem uma conta?
            <Link
              to="/Register"
              className="font-medium text-orange-600 hover:text-orange-400 transition-colors"
            >
              Cadastre-se aqui.
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
