import type { ReactNode } from 'react'

type CardShellProps = {
  title: string
  children: ReactNode
}

export default function CardShell({ title, children }: CardShellProps) {
  return (
    <main className="page">
      <section className="card">
        <h1>{title}</h1>
        {children}
      </section>
    </main>
  )
}
