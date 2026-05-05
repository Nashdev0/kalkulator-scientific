import React from "react";
import { Calculator } from "./components/Calculator";

function App() {
  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-start relative overflow-x-hidden w-full max-w-2xl mx-auto">
      {/* Cute Floating Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-[10%] left-[5%] text-2xl sm:text-4xl animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          🌸
        </div>
        <div className="absolute top-[20%] right-[10%] text-3xl sm:text-4xl animate-pulse">
          ✨
        </div>
        <div
          className="absolute bottom-[20%] left-[10%] text-2xl sm:text-3xl animate-bounce"
          style={{ animationDuration: "4s" }}
        >
          🎀
        </div>
        <div className="absolute bottom-[10%] right-[5%] text-3xl sm:text-4xl animate-pulse">
          💖
        </div>
      </div>

      <div className="w-full flex justify-center mt-20 sm:mt-16 relative z-10 px-2 sm:px-0">
        <Calculator />
      </div>

      <div className="w-full mt-12 mb-16 glass-panel p-6 text-[#8b008b] relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#ffb6c1] border-[3px] border-[#ff69b4] px-6 py-1.5 rounded-full shadow-[0_4px_0px_#ff1493] text-white font-bold tracking-widest uppercase text-sm text-center whitespace-nowrap w-max flex items-center justify-center gap-2">
          Buku Panduan 📖
        </div>

        <h2 className="text-2xl font-bold mb-4 mt-2 text-center text-[#ff1493]">
          Cara Pakai Kalkulator Ini
        </h2>

        <div className="space-y-4 text-sm font-medium">
          {/* Operasi Dasar */}
          <div className="bg-white/40 p-3 rounded-xl border-2 border-[#ffb6c1]">
            <h3 className="font-bold text-[#c71585] mb-1"> Operasi Dasar</h3>
            <p>
              Gunakan{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                +
              </kbd>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                -
              </kbd>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                ×
              </kbd>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                ÷
              </kbd>{" "}
              seperti biasa. Bisa diketik langsung dari keyboard laptopmu lho!
            </p>
          </div>

          {/* Pangkat & Akar */}
          <div className="bg-white/40 p-3 rounded-xl border-2 border-[#ffb6c1]">
            <h3 className="font-bold text-[#c71585] mb-1">
              {" "}
              Pangkat &amp; Akar
            </h3>
            <p>
              <strong>^ (Pangkat):</strong> Ketik{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                2 ^ 3
              </kbd>{" "}
              → hasilnya <strong>8</strong>
            </p>
            <p>
              <strong>√ (Akar Kuadrat):</strong> Ketik{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                √(9)
              </kbd>{" "}
              → hasilnya <strong>3</strong>
            </p>
            <p>
              <strong>x√y (Akar Custom):</strong> Ketik{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                x√y(27, 3)
              </kbd>{" "}
              → hasilnya <strong>3</strong>
            </p>
          </div>

          {/* Logaritma */}
          <div className="bg-white/40 p-3 rounded-xl border-2 border-[#ffb6c1]">
            <h3 className="font-bold text-[#c71585] mb-1"> Logaritma</h3>
            <p>
              <strong>log (basis 10):</strong>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                log(100)
              </kbd>{" "}
              → <strong>2</strong>
            </p>
            <p>
              <strong>ln (basis e):</strong>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                ln(e)
              </kbd>{" "}
              → <strong>1</strong>
            </p>
            <div className="mt-2 pt-2 border-t border-[#ffb6c1]/50">
              <p>
                <strong>logₙ (log pangkat bawah / basis bebas):</strong>
                <br />
                Pilih tombol <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">logₙ</kbd> lalu masukkan dengan format <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">logₙ(AngkaUtama, Basis)</kbd>
              </p>
              <ul className="pl-4 mt-1 space-y-1 text-[#c71585]/80 text-xs list-disc">
                <li>
                  Untuk menghitung <strong>²log(8)</strong> (log basis 2 dari 8):
                  <br/>Ketik <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">logₙ(8, 2)</kbd> → hasilnya <strong>3</strong>
                </li>
                <li>
                  Untuk menghitung <strong>³log(81)</strong> (log basis 3 dari 81):
                  <br/>Ketik <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">logₙ(81, 3)</kbd> → hasilnya <strong>4</strong>
                </li>
              </ul>
              <p className="text-xs text-[#c71585]/80 mt-1 italic">
                *Jangan lupa gunakan tanda koma (,) untuk memisahkan angka!
              </p>
            </div>
          </div>

          {/* Fungsi Matematika */}
          <div className="bg-white/40 p-3 rounded-xl border-2 border-[#ffb6c1]">
            <h3 className="font-bold text-[#c71585] mb-1">
              {" "}
              Fungsi Matematika Lainnya
            </h3>
            <p>
              <strong>! (Faktorial):</strong> Ketik{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                5!
              </kbd>{" "}
              → 5×4×3×2×1 = <strong>120</strong>
            </p>
            <p>
              <strong>mod (Sisa Bagi):</strong> Ketik{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                5 mod 2
              </kbd>{" "}
              → hasilnya <strong>1</strong>
            </p>
            <p>
              <strong>∑ (Sum):</strong> Ketik{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                ∑(1, 2, 3)
              </kbd>{" "}
              → hasilnya <strong>6</strong>
            </p>
            <p>
              <strong>|x| (Nilai Mutlak):</strong> Tekan <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">|x|</kbd> dua kali — satu untuk buka, satu untuk tutup.
            </p>
            <p className="pl-3 text-[#c71585]/80 text-xs mt-1">
              ▸ Ketik <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">|x|</kbd> <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">-5</kbd> <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">|x|</kbd> → <code>|-5|</code> = <strong>5</strong>
            </p>
            <p className="pl-3 text-[#c71585]/80 text-xs">
              ▸ <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">|sin(270°)|</kbd> = <strong>1</strong> (minus jadi plus)
            </p>
          </div>

          {/* Peluang */}
          <div className="bg-white/40 p-3 rounded-xl border-2 border-[#ffb6c1]">
            <h3 className="font-bold text-[#c71585] mb-1">
              {" "}
              Peluang (Permutasi &amp; Kombinasi)
            </h3>
            <p>
              <strong>nPr:</strong>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                nPr(5, 2)
              </kbd>{" "}
              → permutasi 5 ambil 2
            </p>
            <p>
              <strong>nCr:</strong>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                nCr(5, 2)
              </kbd>{" "}
              → kombinasi 5 ambil 2 = <strong>10</strong>
            </p>
          </div>

          {/* Trigonometri */}
          <div className="bg-white/40 p-3 rounded-xl border-2 border-[#ffb6c1]">
            <h3 className="font-bold text-[#c71585] mb-1"> Trigonometri</h3>
            <p>
              Klik tombol <strong>"Sudut: RAD/DEG"</strong> di pojok kanan atas
              layar untuk ganti mode sudut.
            </p>
            <p>
              <strong>Mode DEG:</strong>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                sin(90)
              </kbd>{" "}
              = 1
            </p>
            <p>
              <strong>Pakai simbol °:</strong>{" "}
              <kbd className="bg-white px-1 rounded shadow-sm border border-[#ffb6c1]">
                sin(90°)
              </kbd>{" "}
              = 1 (di mode RAD sekalipun!)
            </p>
          </div>

          {/* Memori */}
          <div className="bg-white/40 p-3 rounded-xl border-2 border-[#ffb6c1]">
            <h3 className="font-bold text-[#c71585] mb-1">
              {" "}
              Tombol Memori (M)
            </h3>
            <p>
              <strong>M+:</strong> Tambah hasil ke memori.
            </p>
            <p>
              <strong>M-:</strong> Kurangi hasil dari memori.
            </p>
            <p>
              <strong>MR:</strong> Panggil angka dari memori.
            </p>
            <p>
              <strong>MC:</strong> Hapus isi memori.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
