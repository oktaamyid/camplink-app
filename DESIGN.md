# DESIGN.md

````md
# CampLink Design System
# UI/UX Guidelines

## 1. Design Philosophy

CampLink menggunakan pendekatan desain:
- Minimalis
- Modern
- Clean
- Fokus pada keterbacaan
- Tidak terlalu banyak warna
- Menghindari cyberpunk style
- Menghindari AI slop aesthetic
- Nyaman digunakan mahasiswa dalam waktu lama

Inspirasi:
- Linear
- Notion
- GitHub
- Stripe Dashboard
- Raycast
- Vercel

---

# 2. Visual Direction

## Core Feel
CampLink harus terasa:
- Profesional
- Tenang
- Elegan
- Fokus pada konten
- Tidak ramai
- Tidak childish

## Design Keywords
- Soft
- Spacious
- Rounded
- Calm
- Neutral
- Structured

---

# 3. Color System

## Primary Color
```css
Primary: #2F3E8F
````

Digunakan untuk:

* Button utama
* Active state
* Link penting
* Badge utama

---

## Secondary Color

```css
Secondary: #64748B
```

Digunakan untuk:

* Secondary text
* Subtitle
* Icon

---

## Background Colors

```css
Background: #F8FAFC
Card: #FFFFFF
Border: #E2E8F0
```

---

## Text Colors

```css
Title: #0F172A
Body: #334155
Muted: #94A3B8
```

---

## Success / Warning / Error

```css
Success: #16A34A
Warning: #D97706
Error: #DC2626
```

Gunakan seminimal mungkin.

---

# 4. Typography

## Font Recommendation

### Primary Font

```txt
Inter
```

Alternatif:

* Plus Jakarta Sans
* Geist
* Manrope

---

## Typography Scale

| Element       | Size      | Weight   |
| ------------- | --------- | -------- |
| Hero Title    | 40px      | Bold     |
| Page Title    | 32px      | SemiBold |
| Section Title | 24px      | SemiBold |
| Card Title    | 18px      | Medium   |
| Body          | 14px–16px | Regular  |
| Caption       | 12px      | Regular  |

---

# 5. Layout System

## Container Width

```css
max-width: 1280px
```

---

## Spacing System

Gunakan sistem spacing:

```txt
4px
8px
12px
16px
20px
24px
32px
48px
64px
```

Hindari spacing random.

---

## Border Radius

```css
Card Radius: 16px
Button Radius: 12px
Input Radius: 12px
```

---

# 6. Shadow System

Gunakan shadow soft dan tipis.

```css
box-shadow:
0 1px 2px rgba(0,0,0,0.04),
0 4px 12px rgba(0,0,0,0.04);
```

Hindari:

* Shadow hitam tebal
* Glow neon
* Efek blur berlebihan

---

# 7. Components

## Button

### Primary Button

* Background primary
* Text putih
* Tinggi 44px
* Padding horizontal 20px

### Secondary Button

* Border soft gray
* Background putih

### Danger Button

* Gunakan merah hanya untuk delete

---

## Input

Style:

* Border soft gray
* Background putih
* Focus ring primary soft

Placeholder:

* Warna muted

---

## Card

Card harus:

* Clean
* Tidak terlalu banyak border
* Padding lega
* Ada whitespace

---

# 8. Navbar Design

## Top Navbar

Isi:

* Search bar
* Notification
* Profile

Style:

* Tinggi 72px
* Background putih
* Border bawah tipis

---

## Sidebar

Style:

* Minimal
* Icon outline
* Active state soft primary

Menu:

* Beranda
* Kegiatan
* Tim Saya
* Notifikasi
* Profil
* Pengaturan

---

# 9. Dashboard Design

## Hero Section

Berisi:

* Greeting user
* Quick stats
* CTA button

---

## Event Card

Isi:

* Poster
* Judul
* Kategori
* Tanggal
* Lokasi

Style:

* Vertical card
* Rounded image
* Hover soft lift

---

# 10. Event Detail Page

Layout:

```txt
Left:
- Event information
- Description
- Team requirement

Right:
- Recruitment card
- Organizer profile
- Join button
```

---

# 11. Create Event Page

Gunakan:

* Form vertical
* 1 column
* Banyak whitespace

Hindari:

* Form terlalu padat
* Border terlalu banyak

---

# 12. Recruitment UI

## Team Card

Isi:

* Team leader
* Needed positions
* Quota

## Join Request

Gunakan:

* Accept button
* Reject button

Simple dan jelas.

---

# 13. Animation Guidelines

Gunakan animation:

* Cepat
* Halus
* Minimal

Durasi:

```css
150ms–250ms
```

Gunakan:

* Fade
* Soft scale
* Soft hover

Hindari:

* Bounce
* Neon transition
* Cyberpunk animation

---

# 14. Icon Style

Gunakan:

* Lucide Icons
  atau
* Heroicons

Style:

* Outline
* Simple
* Consistent stroke

---

# 15. Responsive Design

## Breakpoints

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

---

## Mobile Rules

* Sidebar menjadi drawer
* Card stack vertical
* Padding lebih kecil
* Search full width

---

# 16. Empty State Design

Gunakan:

* Ilustrasi sederhana
* Text pendek
* CTA jelas

Contoh:

```txt
Belum ada kegiatan ditemukan.
Coba cari kategori lain.
```

---

# 17. Dark Mode

Gunakan dark mode soft:

* Hindari pure black
* Gunakan dark navy

```css
Dark Background: #0F172A
Dark Card: #111827
Dark Border: #1E293B
```

---

# 18. Design Rules

## DO

✅ Banyak whitespace
✅ Fokus readability
✅ Warna sedikit
✅ Layout rapi
✅ Icon simple
✅ Typography clean

## DON'T

❌ Neon glow
❌ Cyberpunk UI
❌ Terlalu banyak gradient
❌ Glassmorphism berlebihan
❌ Animasi berlebihan
❌ Warna terlalu ramai

---

# 19. UI Inspiration

Referensi style:

* Linear.app
* Notion
* GitHub
* Vercel
* Dropbox Dash
* Stripe

---

# 20. Frontend Stack Recommendation

## Styling

* Tailwind CSS

## UI Components

* shadcn/ui

## Icons

* lucide-react

## Animation

* Framer Motion

---

# 21. Suggested Pages

## Public

* Landing Page
* Explore Events
* Login
* Register

## Authenticated

* Dashboard
* Event Detail
* Create Event
* Team Management
* Notifications
* Profile

## Admin

* Manage Users
* Moderate Events
* Reports

---

# 22. Landing Page Structure

## Section Order

1. Navbar
2. Hero
3. Featured Events
4. Team Collaboration Features
5. Testimonials
6. CTA
7. Footer

---

# 23. Hero Section Design

Hero harus:

* Bersih
* Tidak terlalu penuh
* Fokus headline

Layout:

```txt
Left:
- Heading
- Description
- CTA

Right:
- Dashboard preview image
```

---

# 24. Final Design Goal

CampLink harus terasa seperti:

* Platform mahasiswa modern
* Professional SaaS
* Clean productivity app
* Mudah dipakai
* Tidak melelahkan mata
* Elegant tanpa banyak efek

```
```
