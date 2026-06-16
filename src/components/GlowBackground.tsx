export default function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-[110px] animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-brand-dark/30 blur-[120px] animate-blob-slow" />
      <div className="absolute bottom-0 left-1/4 h-[22rem] w-[22rem] rounded-full bg-blue/20 blur-[100px] animate-blob" />
    </div>
  );
}
