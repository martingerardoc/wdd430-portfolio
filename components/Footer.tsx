export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-slate-300">
          Copyright &copy; {new Date().getFullYear()} Martin Céspedes |
          All rights reserved
        </p>
      </div>
    </footer>
  );
}