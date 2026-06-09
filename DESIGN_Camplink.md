# DESIGN.md — Camplink

## 1. Gambaran Umum Desain

Camplink adalah aplikasi web untuk membantu mahasiswa menemukan kegiatan kampus, bergabung dengan komunitas, serta berkolaborasi dalam proyek atau acara bersama mahasiswa lain.

Arah desain Camplink dibuat dengan gaya **modern, clean, profesional, dan ramah mahasiswa**. Tampilan tidak terlalu ramai, tetapi tetap terasa aktif, dinamis, dan cocok untuk platform kegiatan kampus.

Desain utama menggunakan pendekatan **startup/product landing page**, dengan elemen kartu, ikon sederhana, ilustrasi mahasiswa, dan layout yang mudah dipahami.

---

## 2. Tujuan Desain

Tujuan utama desain Camplink adalah:

1. Membuat pengguna langsung memahami fungsi aplikasi sejak membuka halaman utama.
2. Menampilkan kegiatan kampus dan komunitas secara menarik.
3. Memudahkan mahasiswa mencari event, komunitas, dan proyek kolaborasi.
4. Memberikan kesan aplikasi yang terpercaya, rapi, dan profesional.
5. Menjaga tampilan tetap mudah dibuat ulang menggunakan Figma dan diimplementasikan ke Laravel.

---

## 3. Karakter Visual

Karakter visual Camplink:

- Clean
- Modern
- Friendly
- Professional
- Soft
- Academic
- Collaborative
- Tidak cyberpunk
- Tidak terlalu banyak warna
- Tidak terlalu ramai
- Mudah direplikasi di Figma

Camplink tidak menggunakan desain yang terlalu futuristik, neon, atau terlalu kompleks. Fokus desainnya adalah platform mahasiswa yang nyaman digunakan setiap hari.

---

## 4. Palet Warna

### 4.1 Warna Utama

| Nama Warna | Hex | Fungsi |
|---|---:|---|
| Primary Blue | `#2563EB` | Tombol utama, highlight, link aktif |
| Dark Navy | `#0F172A` | Heading utama dan teks penting |
| Soft Blue | `#DBEAFE` | Background aksen, icon container |
| Light Blue | `#EFF6FF` | Background section ringan |

### 4.2 Warna Netral

| Nama Warna | Hex | Fungsi |
|---|---:|---|
| White | `#FFFFFF` | Background utama dan card |
| Slate 50 | `#F8FAFC` | Background section |
| Slate 100 | `#F1F5F9` | Border halus dan area ringan |
| Slate 300 | `#CBD5E1` | Border input/card |
| Slate 500 | `#64748B` | Teks sekunder |
| Slate 700 | `#334155` | Teks body |
| Slate 900 | `#0F172A` | Heading |

### 4.3 Warna Aksen

| Nama Warna | Hex | Fungsi |
|---|---:|---|
| Success Green | `#22C55E` | Status terbuka/aktif |
| Warning Orange | `#F97316` | Badge event baru/terbatas |
| Purple Accent | `#8B5CF6` | Badge komunitas/kolaborasi |
| Yellow Accent | `#FACC15` | Icon ide, rating, highlight kecil |

Catatan:
Gunakan warna aksen secukupnya. Warna utama tetap biru agar identitas Camplink konsisten.

---

## 5. Tipografi

### 5.1 Font Utama

Rekomendasi font:

- **Inter**
- **Plus Jakarta Sans**
- **Geist Sans**

Font yang paling direkomendasikan adalah **Plus Jakarta Sans** karena terlihat modern, rapi, dan cocok untuk aplikasi kampus.

### 5.2 Skala Font

| Elemen | Ukuran | Weight |
|---|---:|---|
| Hero Heading | 48–64px | 700–800 |
| Section Heading | 28–36px | 700 |
| Card Title | 16–20px | 600–700 |
| Body Text | 14–16px | 400–500 |
| Caption | 12–13px | 400–500 |
| Button Text | 14–16px | 600 |

### 5.3 Gaya Penulisan

Gunakan bahasa yang singkat, jelas, dan ramah mahasiswa.

Contoh:
- “Temukan kegiatan kampus yang sesuai minatmu.”
- “Gabung komunitas dan mulai kolaborasi.”
- “Bangun proyek bersama mahasiswa lain.”

Hindari kalimat yang terlalu formal atau terlalu promosi berlebihan.

---

## 6. Layout Umum

### 6.1 Struktur Halaman Home

Urutan section pada halaman utama:

1. Navbar
2. Hero Section
3. Event Kampus Unggulan
4. Komunitas Populer
5. Fitur Kolaborasi
6. Statistik Platform
7. Testimoni / Aktivitas Terbaru
8. Call To Action
9. Footer

### 6.2 Container

Gunakan container maksimal:

```css
max-width: 1200px;
margin: 0 auto;
padding: 0 24px;
```

Untuk desktop, konten dibuat lebar tetapi tetap memiliki ruang kosong yang nyaman.

### 6.3 Spacing

Gunakan sistem spacing konsisten:

| Token | Ukuran |
|---|---:|
| `space-xs` | 4px |
| `space-sm` | 8px |
| `space-md` | 16px |
| `space-lg` | 24px |
| `space-xl` | 32px |
| `space-2xl` | 48px |
| `space-3xl` | 64px |
| `space-4xl` | 96px |

Setiap section sebaiknya memiliki padding vertical sekitar `64px–96px`.

---

## 7. Navbar

### 7.1 Struktur Navbar

Navbar berisi:

- Logo Camplink
- Menu:
  - Home
  - Events
  - Communities
  - Kolaborasi
- Tombol:
  - Login
  - Sign Up

### 7.2 Gaya Navbar

- Background: putih semi-transparan atau putih solid
- Border bottom: `1px solid #E2E8F0`
- Height: 72px
- Position: sticky opsional
- Logo di kiri
- Menu di tengah atau kanan
- Tombol auth di kanan

### 7.3 Active State

Menu aktif menggunakan:

- Warna teks: `#2563EB`
- Underline kecil di bawah menu
- Font weight: 600

---

## 8. Hero Section

### 8.1 Tujuan Hero

Hero section harus langsung menjelaskan manfaat utama Camplink.

### 8.2 Isi Hero

Contoh headline:

```text
Tempat Kegiatan Mahasiswa & Kolaborasi Kampus
```

Contoh subheadline:

```text
Camplink membantu kamu menemukan kegiatan kampus, bergabung dengan komunitas, dan berkolaborasi dalam proyek yang berdampak.
```

CTA utama:

```text
Jelajahi Kegiatan
```

CTA sekunder:

```text
Mulai Kolaborasi
```

### 8.3 Visual Hero

Visual hero dapat berisi:

- Mockup dashboard kecil
- Card event
- Card komunitas
- Ilustrasi mahasiswa berdiskusi
- Icon chat, ide, komunitas, dan kalender

### 8.4 Layout Hero

Desktop:

- Kiri: teks, CTA, ringkasan manfaat
- Kanan: mockup aplikasi / ilustrasi

Mobile:

- Teks di atas
- Visual di bawah
- Tombol CTA full width atau stacked

---

## 9. Event Kampus Unggulan

### 9.1 Tujuan Section

Menampilkan daftar event kampus yang sedang populer atau direkomendasikan.

### 9.2 Isi Card Event

Setiap card event berisi:

- Thumbnail
- Badge status
- Judul event
- Tanggal dan waktu
- Lokasi
- Kategori
- Jumlah peserta

Contoh event:

- Seminar Nasional Inovasi & Teknologi
- Campus Career Expo 2024
- Workshop Desain UI/UX
- Lomba Karya Tulis Mahasiswa

### 9.3 Gaya Card Event

- Background: putih
- Border: `1px solid #E2E8F0`
- Border radius: 16px
- Shadow halus
- Thumbnail rasio 16:9
- Badge kecil di pojok thumbnail

### 9.4 Badge Event

| Status | Warna |
|---|---|
| Upcoming | Biru |
| Open | Hijau |
| Limited Seat | Ungu |
| New | Oranye |

---

## 10. Komunitas Populer

### 10.1 Tujuan Section

Menampilkan komunitas kampus yang dapat diikuti mahasiswa.

### 10.2 Isi Card Komunitas

Setiap card berisi:

- Logo/icon komunitas
- Nama komunitas
- Jumlah anggota
- Kategori

Contoh komunitas:

- Google Developer Students Club
- Kewirausahaan Mahasiswa
- English Club Universitas
- Photography Community
- Relawan Kampus
- Debate Club

### 10.3 Gaya Card Komunitas

- Bentuk compact card
- Icon di bagian atas
- Nama komunitas di tengah
- Jumlah anggota kecil
- Badge kategori di bawah

Card komunitas harus terlihat ringan dan tidak terlalu penuh.

---

## 11. Fitur Kolaborasi

### 11.1 Tujuan Section

Menjelaskan fitur kolaborasi utama pada Camplink.

### 11.2 Fitur Utama

1. **Temukan Partner**  
   Mahasiswa dapat mencari teman dengan minat dan kemampuan yang sesuai.

2. **Bagikan Ide**  
   Mahasiswa dapat membagikan ide kegiatan atau proyek.

3. **Bergabung di Proyek**  
   Mahasiswa dapat ikut serta dalam proyek yang sedang berjalan.

4. **Diskusi & Update**  
   Mahasiswa dapat berdiskusi, memberi update, dan berkoordinasi.

### 11.3 Visual

Gunakan icon sederhana:

- People icon
- Lightbulb icon
- Folder/project icon
- Chat icon

Icon diletakkan dalam lingkaran soft color agar section terasa hidup.

---

## 12. Statistik Platform

### 12.1 Tujuan Section

Memberi kesan bahwa platform aktif dan terpercaya.

### 12.2 Contoh Statistik

| Angka | Label |
|---:|---|
| 25.000+ | Mahasiswa Aktif |
| 1.200+ | Event Terselenggara |
| 350+ | Komunitas Aktif |
| 3.500+ | Kolaborasi Terbentuk |

### 12.3 Gaya Statistik

- Diletakkan dalam satu card horizontal
- Gunakan icon kecil di setiap item
- Angka dibuat besar dan tebal
- Label dibuat kecil dan netral

---

## 13. Testimoni dan Aktivitas Terbaru

### 13.1 Testimoni

Testimoni digunakan untuk menunjukkan pengalaman pengguna.

Isi testimoni:

- Avatar
- Nama pengguna
- Role
- Kutipan singkat
- Rating bintang

Contoh:

```text
“Camplink membantuku menemukan komunitas yang sesuai dengan minatku. Sekarang aku jadi lebih aktif di kampus.”
```

### 13.2 Aktivitas Terbaru

Aktivitas terbaru dapat menampilkan update seperti:

- Workshop mendapat pendaftar baru
- Komunitas membuat postingan baru
- Mahasiswa bergabung di proyek
- Event baru dipublikasikan

Gunakan layout list sederhana dengan icon kecil.

---

## 14. Call To Action

### 14.1 Tujuan CTA

Mengajak mahasiswa mulai menggunakan Camplink.

### 14.2 Contoh Teks

```text
Bergabunglah dengan Camplink Sekarang!
Temukan kegiatan seru, komunitas inspiratif, dan wujudkan kolaborasi terbaik di kampusmu.
```

### 14.3 Tombol

- Daftar Gratis
- Jelajahi Camplink

### 14.4 Gaya CTA

- Background biru solid atau gradient biru halus
- Text putih
- Border radius besar
- Tombol putih untuk CTA utama
- Tombol outline untuk CTA sekunder

---

## 15. Footer

Footer berisi:

- Logo Camplink
- Deskripsi singkat
- Link platform
- Link perusahaan
- Link bantuan
- Social media
- Informasi download aplikasi jika diperlukan

### 15.1 Struktur Footer

Kolom footer:

1. Brand
2. Platform
3. Perusahaan
4. Bantuan
5. Unduh Aplikasi

### 15.2 Contoh Link

Platform:

- Events
- Communities
- Kolaborasi
- Cari

Perusahaan:

- Tentang Kami
- Karier
- Blog
- Kontak

Bantuan:

- Pusat Bantuan
- Panduan
- Kebijakan Privasi
- Syarat & Ketentuan

---

## 16. Komponen UI

### 16.1 Button

#### Primary Button

```css
background: #2563EB;
color: #FFFFFF;
border-radius: 12px;
padding: 12px 20px;
font-weight: 600;
```

#### Secondary Button

```css
background: #FFFFFF;
color: #2563EB;
border: 1px solid #2563EB;
border-radius: 12px;
padding: 12px 20px;
font-weight: 600;
```

#### Hover State

Primary button:

```css
background: #1D4ED8;
```

Secondary button:

```css
background: #EFF6FF;
```

---

### 16.2 Card

```css
background: #FFFFFF;
border: 1px solid #E2E8F0;
border-radius: 16px;
box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
```

Hover:

```css
transform: translateY(-4px);
box-shadow: 0 16px 32px rgba(15, 23, 42, 0.10);
```

---

### 16.3 Badge

```css
border-radius: 999px;
padding: 4px 10px;
font-size: 12px;
font-weight: 600;
```

Contoh warna badge:

```css
.badge-blue {
  background: #DBEAFE;
  color: #2563EB;
}

.badge-green {
  background: #DCFCE7;
  color: #16A34A;
}

.badge-orange {
  background: #FFEDD5;
  color: #F97316;
}

.badge-purple {
  background: #EDE9FE;
  color: #7C3AED;
}
```

---

### 16.4 Input Search

```css
height: 44px;
border: 1px solid #E2E8F0;
border-radius: 999px;
padding: 0 16px;
background: #FFFFFF;
color: #334155;
```

Focus:

```css
border-color: #2563EB;
box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
```

---

## 17. Responsive Design

### 17.1 Desktop

- Navbar horizontal
- Hero 2 kolom
- Event cards 4 kolom
- Komunitas 6 kolom
- Statistik 4 kolom
- Footer multi kolom

### 17.2 Tablet

- Hero tetap 2 kolom, tetapi visual lebih kecil
- Event cards 2 kolom
- Komunitas 3 kolom
- Statistik 2 kolom

### 17.3 Mobile

- Navbar berubah menjadi hamburger menu
- Hero menjadi 1 kolom
- CTA button menjadi stacked
- Event cards 1 kolom
- Komunitas 2 kolom atau 1 kolom
- Statistik 1 kolom
- Footer menjadi 1 kolom

### 17.4 Breakpoint Rekomendasi

```css
sm: 640px;
md: 768px;
lg: 1024px;
xl: 1280px;
```

---

## 18. Microinteraction

Gunakan animasi ringan agar UI terasa hidup.

### 18.1 Hover Card

- Card naik sedikit
- Shadow bertambah halus
- Transisi 200–300ms

### 18.2 Button

- Warna berubah saat hover
- Icon arrow sedikit bergeser ke kanan

### 18.3 Navbar

- Menu aktif diberi underline
- Link berubah warna ke primary blue saat hover

### 18.4 Section Reveal

Opsional:

- Section muncul perlahan saat scroll
- Gunakan opacity dan transform kecil

Contoh:

```css
transition: all 300ms ease;
```

---

## 19. Arah Ilustrasi dan Icon

### 19.1 Ilustrasi

Ilustrasi sebaiknya menampilkan:

- Mahasiswa berdiskusi
- Laptop
- Card event
- Komunitas
- Chat bubble
- Lightbulb
- Kalender

Gaya ilustrasi:

- Flat illustration
- Soft color
- Tidak terlalu 3D
- Tidak terlalu realistis
- Friendly dan modern

### 19.2 Icon

Gunakan icon library seperti:

- Lucide Icons
- Heroicons
- Phosphor Icons

Rekomendasi utama: **Lucide Icons**, karena clean dan cocok untuk UI modern.

---

## 20. Prinsip Desain

Saat mengembangkan Camplink, gunakan prinsip berikut:

1. **Clarity First**  
   Setiap section harus mudah dipahami dalam beberapa detik.

2. **Clean but Not Empty**  
   Desain boleh clean, tetapi tetap memiliki visual yang hidup.

3. **Consistent Spacing**  
   Jarak antar elemen harus rapi dan konsisten.

4. **Card-Based Layout**  
   Gunakan card untuk event, komunitas, fitur, dan aktivitas.

5. **Readable Text**  
   Hindari teks terlalu kecil atau terlalu padat.

6. **Friendly for Students**  
   Desain harus terasa dekat dengan dunia mahasiswa.

7. **Easy to Build**  
   Hindari elemen yang terlalu rumit agar mudah dibuat di Laravel dan Tailwind.

---

## 21. Contoh Struktur Komponen Frontend

Struktur komponen halaman home:

```text
components/
├── layout/
│   ├── Navbar.tsx / Navbar.blade.php
│   └── Footer.tsx / Footer.blade.php
├── home/
│   ├── HeroSection.tsx / hero-section.blade.php
│   ├── FeaturedEvents.tsx / featured-events.blade.php
│   ├── PopularCommunities.tsx / popular-communities.blade.php
│   ├── CollaborationFeatures.tsx / collaboration-features.blade.php
│   ├── StatsSection.tsx / stats-section.blade.php
│   ├── TestimonialsSection.tsx / testimonials-section.blade.php
│   └── CTASection.tsx / cta-section.blade.php
└── ui/
    ├── Button.tsx / button.blade.php
    ├── Card.tsx / card.blade.php
    ├── Badge.tsx / badge.blade.php
    └── Input.tsx / input.blade.php
```

Jika menggunakan Laravel Blade, nama file bisa dibuat dengan format kebab-case.

---

## 22. Rekomendasi Tailwind Theme

Contoh konfigurasi warna:

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        500: '#2563EB',
        600: '#1D4ED8',
        700: '#1E40AF',
      },
      dark: '#0F172A',
      muted: '#64748B',
      surface: '#FFFFFF',
      border: '#E2E8F0',
    },
    borderRadius: {
      xl: '16px',
      '2xl': '24px',
    },
    boxShadow: {
      soft: '0 8px 24px rgba(15, 23, 42, 0.06)',
      card: '0 16px 32px rgba(15, 23, 42, 0.10)',
    }
  }
}
```

---

## 23. Referensi Gaya Desain

Gaya desain Camplink dapat mengambil inspirasi dari:

- SaaS landing page
- Campus community platform
- Event management platform
- Startup collaboration tools
- Dashboard modern berbasis card

Namun desain tetap harus dibuat original dan disesuaikan dengan kebutuhan mahasiswa.

---

## 24. Catatan Implementasi

Saat diimplementasikan ke aplikasi:

- Gunakan layout responsif sejak awal.
- Gunakan komponen reusable untuk card, button, badge, dan section.
- Simpan warna utama sebagai design token.
- Jangan menggunakan terlalu banyak variasi shadow.
- Jangan terlalu banyak warna gradient.
- Pastikan setiap gambar memiliki fallback atau placeholder.
- Gunakan data dummy terlebih dahulu untuk event dan komunitas.
- Pastikan spacing antar section konsisten.
- Gunakan teks Bahasa Indonesia agar sesuai dengan target pengguna.

---

## 25. Ringkasan Akhir

Desain Camplink harus menampilkan kesan bahwa aplikasi ini adalah pusat kegiatan mahasiswa dan kolaborasi kampus. Landing page harus mampu menjawab tiga pertanyaan utama pengguna:

1. Apa itu Camplink?
2. Apa manfaatnya untuk mahasiswa?
3. Bagaimana cara mulai menggunakan Camplink?

Dengan desain yang clean, modern, dan terstruktur, Camplink dapat terlihat sebagai platform yang profesional, terpercaya, dan relevan untuk kebutuhan mahasiswa.
