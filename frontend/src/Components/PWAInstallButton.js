// PWAInstallButton.jsx
import { useEffect, useState, useCallback } from "react";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [available, setAvailable] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();            // default mini-infobar ko roko
      setDeferredPrompt(e);          // event stash
      setAvailable(true);            // button dikhado
    };

    const onAppInstalled = () => {
      setInstalled(true);
      setAvailable(false);
      setDeferredPrompt(null);
    };

    // already installed?
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)")?.matches ||
      window.navigator.standalone ||
      window.matchMedia?.("(display-mode: fullscreen)")?.matches;

    if (isStandalone) setInstalled(true);

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    // optional: user choice read karna ho to:
    // const { outcome } = await deferredPrompt.userChoice;
    // console.log("User choice:", outcome);
  }, [deferredPrompt]);

//   if (installed) return null;          // installed ho gaya to button chhupa do
//   if (!available) return null;         // jab tak prompt available nahi, mat dikhao

  return (
    <><button
      onClick={handleClick}
      //   className="inline-flex items-center gap-2 px-4 py-2 rounded-full
      //              bg-gradient-to-r from-blue-500 to-indigo-600 text-white
      //              shadow-[0_0_18px_rgba(120,180,255,0.6)]
      //              hover:shadow-[0_0_28px_rgba(140,200,255,0.9)]
      //              transition-all duration-300 hover:scale-105"
      className="btn border-white border-dotted border-2 btn-primary px-1 w-full mt-2  py-1 rounded bg-[#094c73] text-lg text-white hover:bg-blue-700 transition duration-300"
    >
      Install Application 1
    </button></>


  );
}
