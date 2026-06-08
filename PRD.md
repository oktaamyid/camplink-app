# Product Requirements Document (PRD)
# CampLink

## 1. Overview

CampLink adalah platform digital berbasis web yang membantu mahasiswa menemukan informasi kegiatan kampus serta membangun kolaborasi tim untuk seminar, workshop, lomba, penelitian, dan proyek kuliah.

Aplikasi ini bertujuan untuk memusatkan informasi kegiatan mahasiswa yang sebelumnya tersebar di berbagai media seperti grup chat, media sosial, dan poster digital.

Selain itu, CampLink juga menyediakan fitur pencarian anggota tim berdasarkan minat dan keahlian agar proses kolaborasi menjadi lebih efektif.

---

# 2. Goals

## Business Goals
- Menjadi pusat informasi kegiatan mahasiswa
- Mempermudah pembentukan tim kolaborasi
- Meningkatkan partisipasi mahasiswa dalam kegiatan kampus
- Mengurangi penyebaran informasi kegiatan yang tidak valid

## User Goals
- Mahasiswa dapat menemukan kegiatan dengan cepat
- Mahasiswa dapat mencari anggota tim sesuai skill
- Pembuat kegiatan dapat merekrut anggota dengan mudah
- Admin dapat memoderasi kegiatan dan pengguna

---

# 3. Target Users

## Mahasiswa
Pengguna utama aplikasi untuk mencari kegiatan dan bergabung ke tim.

## Pembuat Kegiatan
Mahasiswa atau organisasi yang membuat kegiatan dan membuka recruitment anggota.

## Admin
Pengelola sistem untuk memoderasi pengguna dan kegiatan.

---

# 4. Tech Stack

## Backend
- Laravel 13
- PHP 8.4+
- REST API

## Frontend
- Blade + Tailwind CSS
- Alpine.js

## Database
- MySQL

## Authentication
- Laravel Breeze / Laravel Sanctum

## Storage
- Laravel Storage

## Deployment
- VPS / Shared Hosting / Docker

---

# 5. Core Features

## 5.1 Authentication
### Features
- Register
- Login
- Logout
- Forgot Password
- Email Verification

### User Story
Sebagai mahasiswa, saya ingin membuat akun agar dapat menggunakan CampLink.

---

## 5.2 User Profile
### Features
- Edit profile
- Upload photo profile
- Input skill
- Input interest
- Social links

### User Story
Sebagai mahasiswa, saya ingin menampilkan skill dan minat agar mudah ditemukan dalam kolaborasi.

---

## 5.3 Event Management
### Features
- Create event
- Edit event
- Delete event
- Event categories
- Event poster upload
- Event deadline
- Event detail page

### Categories
- Seminar
- Workshop
- Competition
- Research
- Project

### User Story
Sebagai pembuat kegiatan, saya ingin memposting kegiatan agar mahasiswa lain dapat bergabung.

---

## 5.4 Event Discovery
### Features
- Browse events
- Search events
- Filter by category
- Filter by deadline
- Trending events

### User Story
Sebagai mahasiswa, saya ingin mencari kegiatan sesuai minat saya.

---

## 5.5 Team Recruitment
### Features
- Open recruitment
- Required skills
- Team quota
- Join request
- Accept/reject member
- Team member list

### User Story
Sebagai ketua tim, saya ingin merekrut anggota sesuai kebutuhan proyek.

---

## 5.6 Collaboration System
### Features
- Team discussion
- Status recruitment
- Team progress

---

## 5.7 Notification System
### Features
- Event deadline reminder
- Recruitment accepted/rejected
- New event notification

---

## 5.8 Admin Panel
### Features
- Manage users
- Manage events
- Remove invalid events
- View reports
- Moderate content

---

# 6. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | User dapat register |
| FR-02 | User dapat login |
| FR-03 | User dapat mengedit profile |
| FR-04 | User dapat membuat event |
| FR-05 | User dapat mencari event |
| FR-06 | User dapat membuka recruitment |
| FR-07 | User dapat join team |
| FR-08 | Ketua tim dapat menerima/reject anggota |
| FR-09 | Admin dapat menghapus event |
| FR-10 | Admin dapat mengelola user |

---

# 7. Non Functional Requirements

## Performance
- Response API < 500ms
- Mendukung minimal 1000 user aktif

## Security
- CSRF Protection
- XSS Protection
- Authentication middleware
- Validation semua input

## Scalability
- Struktur modular
- RESTful API

## Availability
- Uptime target 99%

---

# 8. Database Design (High Level)

## Tables

### users
- id
- name
- email
- password
- bio
- skills
- interests
- avatar

### events
- id
- user_id
- title
- description
- category
- deadline
- poster
- location

### teams
- id
- event_id
- leader_id
- quota
- status

### team_members
- id
- team_id
- user_id
- status

### notifications
- id
- user_id
- title
- message
- is_read

---

# 9. User Flow

## Mahasiswa
Register → Login → Browse Event → Join Team → Accepted

## Pembuat Kegiatan
Login → Create Event → Open Recruitment → Accept Members

## Admin
Login → Dashboard → Moderate Events/User

---

# 10. MVP Scope

## Included
- Authentication
- Event CRUD
- Search Event
- Recruitment Team
- Join Request
- Admin Dashboard

## Excluded
- Real-time chat
- AI recommendation
- Mobile app
- Video meeting

---

# 11. Future Features

- AI recommendation event
- Skill matching system
- Mobile application
- Real-time collaboration
- Achievement system
- Gamification

---

# 12. MOV (Measurable Organizational Value)

| Goal | Target |
|---|---|
| Informasi lebih cepat ditemukan | 70% lebih cepat |
| Partisipasi mahasiswa meningkat | +50% |
| Pembentukan tim lebih efisien | +60% |
| Validitas informasi meningkat | 80% pengurangan event tidak valid |

---

# 13. Risks

| Risk | Mitigation |
|---|---|
| User tidak aktif | Tambahkan notification & gamification |
| Spam event | Moderasi admin |
| Server overload | Caching & optimization |
| Recruitment tidak efektif | Skill filtering |

---

# 14. Success Metrics

- Total user registered
- Active users per month
- Total created events
- Total successful team recruitments
- Engagement rate

---

# 15. Timeline (MVP)

| Phase | Duration |
|---|---|
| Requirement Analysis | 1 Week |
| UI/UX Design | 1 Week |
| Backend Development | 3 Weeks |
| Frontend Development | 2 Weeks |
| Testing | 1 Week |
| Deployment | 1 Week |

Total: 9 Weeks

---

# 16. Conclusion

CampLink hadir sebagai solusi digital untuk membantu mahasiswa mendapatkan informasi kegiatan dan membangun kolaborasi secara lebih efektif melalui satu platform terpusat.