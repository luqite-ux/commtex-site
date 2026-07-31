export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 [&_input]:bg-white [&_input]:text-stone-900 [&_input]:placeholder:text-stone-500">
      {children}
    </div>
  )
}
