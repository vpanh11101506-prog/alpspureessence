import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in ALPS app:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#ebe5dc] shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-[#fcedea] text-[#ba1a1a] flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              !
            </div>
            <h2 className="font-serif text-2xl font-normal text-[#1c1c19] mb-2">
              Đã xảy ra lỗi tải trang
            </h2>
            <p className="text-xs text-[#555] mb-6 leading-relaxed">
              Ứng dụng vừa gặp sự cố nhỏ khi kết xuất giao diện. Hãy bấm nút bên dưới để khôi phục hoặc làm mới lại trang.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#1c1c19] text-white rounded-full text-xs font-medium uppercase tracking-wider hover:bg-[#333] transition-all"
            >
              Làm mới lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
