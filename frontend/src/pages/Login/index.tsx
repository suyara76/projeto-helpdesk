import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

//--------definicao do Schema do zod------------
const loginSchema = z.object({
  email: z
    .string()
    .min(1, {message: 'O email é obrigatório'})
    .email({message: 'Insira um email válido'}),
  password: z
    .string()
    .min(6, {message: 'A senha deve ter no mínimo 6 caracteres'}),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login(){
  const [showPassword, setShowPassword] = useState(false);

  //inicia o react hook form
  const{
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      email: '',
      password: '',
    },
  });

  // 3. Função de submissão simulando requisição para a API NestJS
  const onSubmit = async (data: LoginFormData) =>{
    try{
      // Simulação de delay de rede de 1.5 segundos
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Dados validados com sucesso para envio:', data);
    } catch (error){
      console.error('Erro ao autenticar:', error);
    }
  };

  return(
    <div className="min-h-screen w-full flex bg-white text-slate-900 font-sans">
      
      {/* COLUNA ESQUERDA: formulario de login */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative bg-white">
        
        <div className="absolute top-8 left-8 sm:left-16 lg:left-24">
          <button className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors">
            Voltar para o Início
          </button>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Entrar</h1>
          <p className="text-sm text-slate-500 mb-8">Insira seu e-mail e senha cadastrados para acessar sua conta</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/*---------------------------EMAIL-------------------------------------*/}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="seunome@empresa.org.br"
                {...register('email')}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                  ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'}`}
              />
              {errors.email &&(
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/*---------------------------senha-------------------------*/}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Senha <span className="text-red-500">*</span>
                </label>
                <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Esqueci a senha
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-11
                    ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errors.password &&(
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/*-----------------ficar conectado------------------*/}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 select-none">
                Manter-me conectado
              </label>
            </div>

            {/* ------------------------botao de enviar-----------------------*/}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors text-sm disabled:cursor-not-allowed"
            >
              {isSubmitting ?(
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Não tem uma conta?{' '}
            <button className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Cadastre-se aqui.
            </button>
          </p>
        </div>
      </div>

      {/*----------------------------COLUNA DIREITA: logo--------------------------------*/}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 to-blue-950 items-center justify-center relative overflow-hidden p-12">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

        <div className="text-center relative z-10 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl shadow-xl mb-6">
            HD
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">HelpDesk</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Uma plataforma para registro, acompanhamento de solicitações de suporte técnico.
          </p>
        </div>
      </div>
    </div>
  );
}