import InfiniteGallery from "./3d-gallery-photography";

export default function Home() {
  const sampleImages = [
    {
      src: "https://cdn.21st.dev/assets/mirror/fc/fc83db8d2c747996309e3d1df0ece471025ff52b755ea0be54d5561af4fdea0a.jpg",
      alt: "Mountain landscape",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/fb/fb229e985515566ba9f642668ea79221d4b04951fe1ac8a9e9a2a12ee1241f3f.jpg",
      alt: "Ocean waves",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/96/960a2c4268d4e49e3a18a03823a8dbe3d026fcc064874eb471da1478a6982df2.jpg",
      alt: "Forest path",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/95/956cfa97f5924219e2a29362a781a49452392443fca6bc6dd51d1cd8bb5ef486.jpg",
      alt: "Desert dunes",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/66/66b88b185357d69f3b13b5467c66be96af1e79e454602c19444beaa98e68db36.jpg",
      alt: "City skyline",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/92/921e11784bcbd16dbda49478d479a6c379b5aaf0ca074f41f774689c02a4358a.jpg",
      alt: "Northern lights",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/25/25f820e3b1f874b08a3866aee09774860e0f48392c8951909b35827af569a1c7.jpg",
      alt: "Waterfall",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/22/221b7a8ec88ee1945a1047400749344156b39dfbfb133d74a02335e6d3f41d68.jpg",
      alt: "Sunset beach",
    },
  ];

  return (
    <main className="min-h-screen w-full">
      <InfiniteGallery
        images={sampleImages}
        speed={1.2}
        zSpacing={3}
        visibleCount={12}
        falloff={{ near: 0.8, far: 14 }}
        className="h-screen w-full rounded-lg overflow-hidden"
      />
      <div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
        <h1 className="font-serif text-4xl md:text-7xl tracking-tight">
          <span className="italic">I create;</span> therefore I am
        </h1>
      </div>

      <div className="text-center fixed bottom-10 left-0 right-0 font-mono uppercase text-[11px] font-semibold">
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className=" opacity-60">Auto-play resumes after 3 seconds of inactivity</p>
      </div>
    </main>
  );
}

