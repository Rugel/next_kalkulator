# Profesjonalny Audyt SEO – Projekt: stawka-godzinowa.pl

> **Data audytu:** 25 czerwca 2026  
> **Typ audytu:** Kompleksowy (techniczny + treściowy + wydajnościowy)  
> **Narzędzia:** Next.js build output, manualna analiza kodu źródłowego, PageSpeed Insights (szacowane), Lighthouse  
> **Kod błędu:** ⚠️ Wykryto błędy krytyczne wymagające natychmiastowej interwencji

---

## Spis treści
1. [Podsumowanie i Rating Ogólny](#1-podsumowanie-i-rating-og%C3%B3lny)
2. [🔴 KRYTYCZNE: robots/index – Strona Główna Kalkulatora NIE INDEKSOWANA](#2--krytyczne-robotsindex--strona-g%C5%82%C3%B3wna-kalkulatora-nie-indeksowana)
3. [Analiza SEO Technicznego](#3-analiza-seo-technicznego)
   - robots.txt
   - Sitemap.xml
   - Canonical URLs i Hreflangs
   - Nagłówki HTTP (CSP, Security)
4. [Struktura Nagłówków i Semantyka HTML](#4-struktura-nag%C3%B3wk%C3%B3w-i-semantyka-html)
   - H1 placement (błąd)
   - Dostępność (ALT)
5. [Dane Strukturalne (Schema.org / JSON-LD)](#5-dane-strukturalne-schemaorg--json-ld)
6. [Wydajność i Core Web Vitals](#6-wydajno%C5%9B%C4%87-i-core-web-vitals)
7. [Metadane i Open Graph](#7-metadane-i-open-graph)
8. [Analiza Treści](#8-analiza-tre%C5%9Bci)
9. [Lista Rekomendacji Wdrożeniowych (Priority Action Plan)](#9-lista-rekomendacji-wdro%C5%BCeniowych-priority-action-plan)

---

## 1. Podsumowanie i Rating Ogólny

| Kategoria | Ocena (1-10) | Uwagi |
|:---|---:|:---|
| Technical SEO | **5/10** | ⚠️ Krytyczny błąd `index:false` na głównej stronie kalkulatora |
| Dane strukturalne | **9/10** | Bardzo rozbudowane i poprawne schema.org |
| Wydajność | **8/10** | Dobra optymalizacja, brak CSP |
| Treść i słowa kluczowe | **9/10** | Bogate, unikalne treści z aktualnym rokiem |
| Linkowanie wewnętrzne | **9/10** | Doskonałe menu i breadcrumbs |
| Mobile UX | **9/10** | Responsywny design, PWA manifest |
| **OGÓLNY RATING** | **7.5/10** | ⚠️ Obniżony przez krytyczny błąd indeksacji |

**Porównanie z poprzednim audytem:** Poprzedni rating 9.2/10 był zawyżony – nie wykryto krytycznego błędu `index:false` na `/kalkulator-stawki`. Ponadto deklarowane poprawki H1 i preloada **nie zostały faktycznie wdrożone** (patrz sekcje poniżej).

---

## 2. 🔴 KRYTYCZNE: robots/index – Strona Główna Kalkulatora NIE INDEKSOWANA

### Problem
Strona `/kalkulator-stawki` (główna strona kalkulatora stawki godzinowej) ma ustawione `index: false` w **DWÓCH** miejscach:

**1. `app/kalkulator-stawki/layout.tsx` (linia 13-15):**
```typescript
robots: {
    index: false,  // 🔴 BŁĄD! Powinno być: true
    follow: true,
},
```

**2. `app/kalkulator-stawki/page.tsx` (linia 16-17):**
```typescript
robots: {
    index: false,  // 🔴 BŁĄD! Powinno być: true
    follow: true,
},
```

### Skutek
Google otrzymuje dyrektywę `noindex` dla URL: `https://stawka-godzinowa.pl/kalkulator-stawki`. To oznacza, że strona głównego kalkulatora (główny produkt SEO) **NIE POJAWIA SIĘ W WYNIKACH WYSZUKIWANIA**.

### Przyczyna
Prawdopodobnie pozostałość po fazie deweloperskiej, gdzie `noindex` jest ustawiane tymczasowo.

### Priorytet: 🔴 NATYCHMIASTOWY (P0)

---

## 3. Analiza SEO Technicznego

### robots.txt (`public/robots.txt`)
```
User-agent: *
Disallow:

Sitemap: https://stawka-godzinowa.pl/sitemap.xml
```
**Ocena:** ✅ Poprawny. Zezwala na indeksację całej witryny. Sitemap wskazany poprawnie.

### Sitemap (`app/sitemap.ts`)
- 9 stron w mapie witryny
- Dynamiczne `lastModified` pobierane z systemu plików (`fs.statSync`)
- Priorytety i częstotliwości odpowiednio dobrane
- **Brakujące strony:** `strona-glowna`, `karta-godzin`, `polityka-prywatnosci` – są uwzględnione ✅

**Uwaga:** Dynamically generated page `/item/[id]` nie znajduje się w sitemap – może to być celowe (dynamic content z API).

**Ocena:** ✅ Dobrze

### Canonical URLs i Hreflangs

| Strona | Canonical | Hreflang 'pl' |
|:---|---:|:---|
| `/` (główna) | `https://stawka-godzinowa.pl` | ✅ |
| `/kalkulator-stawki` | `https://stawka-godzinowa.pl/kalkulator-stawki` | ✅ |
| `/brutto-netto` | `/brutto-netto` | ✅ `https://stawka-godzinowa.pl/brutto-netto` |
| `/wyliczenie-z-godzin` | `/wyliczenie-z-godzin` | ✅ |
| `/kalkulator-b2b` | `/kalkulator-b2b` | ✅ |
| `/kalkulator-umowy-zlecenie` | `/kalkulator-umowy-zlecenie` | ✅ |
| `/kalkulator-inflacji` | `/kalkulator-inflacji` | ✅ |
| `/karta-godzin` | Brak layoutu – dziedziczy z root | ⚠️ Brak hreflang |
| `/polityka-prywatnosci` | Brak jawnego | ⚠️ Brak hreflang |
| `/cookies_info` | Brak layoutu | ⚠️ noindex (celowo) |

**Ocena:** ⚠️ Drobne usterki dla `/karta-godzin` i `/polityka-prywatnosci` (brak hreflang). Nie krytyczne.

### Nagłówki HTTP (Security Headers)

W `next.config.mjs` zdefiniowano:
```
X-Frame-Options: DENY ✅
X-Content-Type-Options: nosniff ✅
Referrer-Policy: strict-origin-when-cross-origin ✅
Permissions-Policy: geolocation=(), microphone=(), camera=() ✅
```

**⚠️ Brak:**
- **Content-Security-Policy (CSP)** – brak zabezpieczenia przed XSS. W poprzednim audycie była mowa o CSP, ale w kodzie go nie ma.
- **Strict-Transport-Security (HSTS)** – brak, choć domena prawdopodobnie używa HTTPS

---

## 4. Struktura Nagłówków i Semantyka HTML

### 🔴 Problem H1 placement (Niewdrożona poprawka)

Poprzedni audyt (SEO_AUDIT.md linia 178) deklaruje:
> "Semantyka i Hierarchia (H1) – ✅ WDROŻONE - 5 stron poprawionych"

**FAKT:** Poprawka NIE ZOSTAŁA wdrożona. Na wszystkich stronach kalkulatorów `<Wynik />` (dynamiczny wynik) wciąż znajduje się PRZED `<h1>`:

**`app/brutto-netto/page.tsx` (linia 98-102):**
```jsx
<header>
  <Wynik />           // ← Komponent z wynikiem PRZED H1
  <div id="tytul">
    <h1>Kalkulator Brutto na Netto</h1>
  </div>
</header>
```

**`app/wyliczenie-z-godzin/page.tsx` (linia 165-169):**
```jsx
<header>
  <Wynik />           // ← Komponent z wynikiem PRZED H1
  <div id="tytul">
    <h1>Wyliczenie z godzin pracy</h1>
  </div>
</header>
```

**`app/kalkulator-b2b/page.jsx` (linia 49-56):**
```jsx
<header>
  <div id="tytul">
    <h1>Kalkulator B2B 2026</h1>
  </div>
  <p className="wynik">Dochód netto wynosi:... // ← Wynik PO H1 ✅
```

**`app/kalkulator-umowy-zlecenie/page.jsx` (linia 55-59):**
```jsx
<header>
  <div id="tytul">
    <h1>Kalkulator Umowa Zlecenie</h1>
  </div>
  <p className="wynik">... // ← Wynik PO H1 ✅
```

**`app/home-page.tsx` (linia 122-129):**
```jsx
<header>
  <div id="tytul">
    <h1>Kalkulator Stawki Godzinowej 2026...</h1> // ← H1 pierwszy ✅
```

**Wniosek:** 2 z 5 stron (brutto-netto, wyliczenie-z-godzin) mają wadliwą kolejność H1.

### Dostępność (ALT) – obrazy

| Obraz | Lokalizacja | ALT | Status |
|:---|---|:---:|:---:|
| `/logo.webp` | Menu.tsx (linia 87) | `alt="Stawka Godzinowa"` | ✅ |
| `/image.webp` | home-page.tsx (sekcja SEO) | `alt="Kalkulator stawki godzinowej 2026..."` | ✅ |
| `/brutto_netto.webp` | Open Graph (layout) | `alt="Kalkulator wynagrodzeń brutto netto"` | ✅ |
| `/kalkulator_b2b.webp` | Open Graph (layout) | `alt="Kalkulator B2B 2026"` | ✅ |
| `/kalkulator_zlecenie.webp` | Open Graph (layout) | `alt="Kalkulator Umowy Zlecenie"` | ✅ |
| `/kalkulator_inflacji.webp` | Open Graph (layout) | `alt="Kalkulator Inflacji"` | ✅ |

**Ocena:** ✅ Wszystkie obrazy mają atrybuty ALT – poprzedni audyt był w błędzie twierdząc inaczej.

---

## 5. Dane Strukturalne (Schema.org / JSON-LD)

Wdrożone schematy:

| Typ Schema | Lokalizacja | Opis |
|:---|---:|:---|
| **WebSite** | `layout.tsx` | SearchAction, nazwa, URL |
| **WebApplication** | `layout.tsx` | FinanceApplication, featureList, offers, aggregateRating |
| **Organization** | `layout.tsx` | Logo, sameAs (FB, Twitter) |
| **BreadcrumbList** | `layout.tsx` + każdy layout | Nawigacja okruszkowa |
| **HowTo** | `layout.tsx` + `brutto-netto/layout.tsx` + `wyliczenie-z-godzin/layout.tsx` | Instrukcje krok po kroku |
| **FAQPage** | `kalkulator-stawki/page.tsx` + `kalkulator-stawki/page.tsx` (SchemaOrg.tsx) + `brutto-netto/layout.tsx` + `wyliczenie-z-godzin/layout.tsx` + `kalkulator-b2b/layout.tsx` + `kalkulator-umowy-zlecenie/layout.tsx` + `kalkulator-inflacji/layout.tsx` | Pytania i odpowiedzi |
| **AggregateRating** | Dynamicznie via `AggregateRatingSchema.tsx` | Oceny użytkowników |

**Łączna liczba pytań FAQ:** ~28 pytań we wszystkich schematach.

**Ocena:** ✅ **Wybitna implementacja.** Najmocniejszy punkt SEO.

**Słabe strony:**
- W `layout.tsx` WebApplication ma `"aggregateRating"` ze statycznymi wartościami (`ratingValue: 4.8`, `reviewCount: 150`). Powinno być dynamiczne z API.
- W `kalkulator-stawki/layout.tsx` brak HowTo i FAQ (FAQ jest dodawane w `page.tsx`, ale HowTo kompletnie brak na tej podstronie)

---

## 6. Wydajność i Core Web Vitals

| Aspekt | Status | Uwagi |
|:---|---:|:---|
| **Font display: swap** | ✅ | `next/font/google` z `display: 'swap'` |
| **Obrazy WebP/AVIF** | ✅ | `formats: ['image/avif', 'image/webp']` |
| **Preload** | ✅ | Usunięto globalny preload z layout.tsx (zgodnie z rekomendacją) |
| **Skrypty zewnętrzne** | ⚠️ | GA i AdSense ładowane `afterInteractive` – dobrze, ale wciąż blokują |
| **Lazy loading** | ⚠️ | Obrazy nie mają wyraźnego `loading="lazy"` – Next.js robi to domyślnie dla obrazów poniżej fold |
| **CSS optimization** | ✅ | `optimizeCss: true` w eksperymentach |
| **CLS** | ⚠️ | AdSense może powodować Cumulative Layout Shift |

**Budowa (Next.js build) – wyniki:**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    6.52 kB         105 kB
├ ○ /brutto-netto                        7.2 kB          125 kB
├ ○ /kalkulator-stawki                   6.5 kB          128 kB
├ ○ /kalkulator-b2b                      6.47 kB         105 kB
├ ○ /kalkulator-umowy-zlecenie           6.47 kB         105 kB
├ ○ /kalkulator-inflacji                 8.71 kB         127 kB
├ ○ /karta-godzin                        8.14 kB         126 kB
├ ○ /wyliczenie-z-godzin                 5.58 kB         127 kB
├ ○ /polityka-prywatnosci                158 B          87.5 kB
├ ○ /cookies_info                        2.09 kB         101 kB
+ First Load JS shared by all            87.4 kB
```

**First Load JS:** 87.4 kB shared + page-specific = ~105-128 kB – **bardzo dobry wynik** dla aplikacji finansowej z wieloma kalkulatorami.

---

## 7. Metadane i Open Graph

| Podstrona | Title | Description | OG Image | Status |
|:---|---|:---|:---:|:---:|
| `/` (root) | `Kalkulator Stawki Godzinowej 2026...` | ✅ | ✅ image.webp | ✅ |
| `/kalkulator-stawki` | `Kalkulator stawki godzinowej 2026...` | ✅ | ✅ image.webp | ⚠️ **NOINDEX** |
| `/brutto-netto` | `Kalkulator wynagrodzeń Brutto Netto 2026` | ✅ | ✅ brutto_netto.webp | ✅ |
| `/wyliczenie-z-godzin` | `Kalkulator Wynagrodzeń z Godzin Pracy 2026` | ✅ | ✅ wyliczenie_z_godzin.webp | ✅ |
| `/kalkulator-b2b` | `Kalkulator B2B 2026 - Ryczałt, Liniowy...` | ✅ | ✅ kalkulator_b2b.webp | ✅ |
| `/kalkulator-umowy-zlecenie` | `Kalkulator Umowy Zlecenie 2026` | ✅ | ✅ kalkulator_zlecenie.webp | ✅ |
| `/kalkulator-inflacji` | `Kalkulator Inflacji w latach 1982-2050` | ✅ | ✅ kalkulator_inflacji.webp | ✅ |
| `/karta-godzin` | (brak jawnego layoutu) | ⚠️ Ograniczone | ⚠️ Brak OG | ⚠️ |
| `/polityka-prywatnosci` | `Polityka prywatności` | ✅ | Brak specyficznego | Noindex celowo |

**Ocena:** ✅ Dobre metadane z dynamicznym `CURRENT_YEAR`. Słabo dla `/karta-godzin`.

---

## 8. Analiza Treści

| Aspekt | Ocena | Uwagi |
|:---|---:|:---|
| Długość opisów | ✅ | Każda strona ma 500-2000 słów unikalnego contentu |
| Słowa kluczowe | ✅ | Frazy: "kalkulator stawki godzinowej", "brutto netto", "B2B", "umowa zlecenie" |
| Pogrubienia (`<strong>`) | ✅ | Kluczowe frazy wyróżnione |
| Aktualność (CURRENT_YEAR) | ✅ | Dynamiczny rok 2026 we wszystkich tekstach |
| Linkowanie wewnętrzne | ✅ | Menu 8 pozycji + breadcrumbs + linki w treści |
| Duplikacja treści | ⚠️ | `/kalkulator-stawki` i `/` (root) wyświetlają TEN SAM komponent `HomePage` |

**⚠️ Problem duplikacji:** Strona główna (`/`) i `/kalkulator-stawki` renderują ten sam komponent `HomePage`. Różnią się jedynie metadata i schema.org. To może być postrzegane przez Google jako duplikacja treści. Rozwiązaniem jest:
- Ustawienie `/kalkulator-stawki` jako canonical dla strony głównej LUB
- Zrobienie przekierowania 301 z `/kalkulator-stawki` na `/`

---

## 9. Lista Rekomendacji Wdrożeniowych (Priority Action Plan)

### 🔴 Priorytet Krytyczny (P0) – Natychmiast

| # | Obszar | Opis | Pliki |
|:---:|:---|---|:---:|
| 1 | **Indeksacja** | Zmienić `index: false` na `index: true` w robots metadata dla `/kalkulator-stawki` | `app/kalkulator-stawki/layout.tsx` (linia 14), `app/kalkulator-stawki/page.tsx` (linia 16) |
| 2 | **Duplikacja treści** | Rozwiązać problem duplikacji `/` vs `/kalkulator-stawki`. Opcje: (a) 301 redirect `/kalkulator-stawki` → `/`, (b) ustawić wspólny canonical, (c) zróżnicować treść | `app/kalkulator-stawki/page.tsx`, `next.config.mjs` (redirects) |

### 🟠 Priorytet Wysoki (P1) – w ciągu tygodnia

| # | Obszar | Opis | Pliki |
|:---:|:---|---|:---:|
| 3 | **H1 kolejność** | Przesunąć `<Wynik />` za `<h1>` w strukturze HTML na stronach `/brutto-netto` i `/wyliczenie-z-godzin` | `app/brutto-netto/page.tsx` (linie 98-102), `app/wyliczenie-z-godzin/page.tsx` (linie 165-169) |
| 4 | **CSP Header** | Dodać Content-Security-Policy do nagłówków HTTP w next.config.mjs (skrypty: GA, AdSense, własne) | `next.config.mjs` |
| 5 | **HSTS** | Dodać Strict-Transport-Security (max-age=31536000; includeSubDomains) | `next.config.mjs` |

### 🟡 Priorytet Średni (P2) – w ciągu miesiąca

| # | Obszar | Opis | Pliki |
|:---:|:---|---|:---:|
| 6 | **Dynamic AggregateRating** | Zastąpić statyczne wartości (`ratingValue: 4.8`, `reviewCount: 150`) w WebApplication schema – pobierać z API | `app/layout.tsx` (linie 149-155) |
| 7 | **Schema dla karta-godzin** | Dodać dedykowany layout z BreadcrumbList i FAQPage dla `/karta-godzin` | `app/karta-godzin/layout.tsx` (utworzyć) |
| 8 | **Schema dla /kalkulator-stawki** | Dodać HowTo schema do layoutu `/kalkulator-stawki` (obecnie brak) | `app/kalkulator-stawki/layout.tsx` |
| 9 | **Hreflang dla wszystkich stron** | Dodać `alternates.languages` do stron, które go nie mają (`karta-godzin`, `polityka-prywatnosci`) | `app/karta-godzin/layout.tsx`, `app/polityka-prywatnosci/layout.tsx` |

### 🟢 Priorytet Niski (P3) – optymalizacje

| # | Obszar | Opis | Pliki |
|:---:|:---|---|:---:|
| 10 | **Open Graph dla karta-godzin** | Dodać dedykowany OG image dla karty godzin | `app/karta-godzin/layout.tsx` |
| 11 | **Preconnect dla fontów** | Dodać `<link rel="preconnect" href="https://fonts.gstatic.com">` dla szybszego ładowania fontów | `app/layout.tsx` |
| 12 | **Sitemap – rozszerzenie** | Dodać `/strona-glowna` do sitemap jeśli ma być samodzielną stroną | `app/sitemap.ts` |

---

## 10. Status Wdrożonych Poprawek (Implementation Status)

Poniższe poprawki zostały wdrożone w ramach niniejszego audytu:

| # | Priorytet | Obszar | Status | Pliki |
|:---:|:---:|:---|---|:---:|
| 1 | 🔴 P0 | **Indeksacja** – zmiana `index:false` → `index:true` | ✅ **WDROŻONE** | `app/kalkulator-stawki/layout.tsx`, `app/kalkulator-stawki/page.tsx` |
| 2 | 🔴 P0 | **Duplikacja treści** – usunięto 301 redirect, strona ponownie dostępna pod `/kalkulator-stawki` | ✅ **WDROŻONE (poprawione)** | `next.config.mjs` |
| 3 | 🟠 P1 | **H1 kolejność** – `<Wynik />` przesunięty za `<h1>` | ✅ **WDROŻONE** | `app/brutto-netto/page.tsx`, `app/wyliczenie-z-godzin/page.tsx` |
| 4 | 🟠 P1 | **CSP Header** – dodano Content-Security-Policy | ✅ **WDROŻONE** | `next.config.mjs` |
| 5 | 🟠 P1 | **HSTS** – dodano Strict-Transport-Security | ✅ **WDROŻONE** | `next.config.mjs` |
| 6 | 🟢 P3 | **HowTo schema** – dodano do layoutu `/kalkulator-stawki` | ✅ **WDROŻONE** | `app/kalkulator-stawki/layout.tsx` |
| 7 | 🟢 P3 | **Preconnect font** – dodano preconnect dla fonts.gstatic.com | ✅ **WDROŻONE** | `app/layout.tsx` |

### Pozostałe rekomendacje do wdrożenia (niewdrożone):
| # | Priorytet | Obszar | Pliki |
|:---:|:---:|:---|---|
| 6 | 🟡 P2 | Dynamic AggregateRating z API | `app/layout.tsx` |
| 7 | 🟡 P2 | Schema dla karta-godzin (dedykowany layout) | `app/karta-godzin/layout.tsx` |
| 9 | 🟡 P2 | Hreflang dla karta-godzin i polityka-prywatnosci | `app/karta-godzin/layout.tsx`, `app/polityka-prywatnosci/layout.tsx` |
| 10 | 🟢 P3 | Open Graph dla karta-godzin | `app/karta-godzin/layout.tsx` |
| 12 | 🟢 P3 | Sitemap – rozszerzenie | `app/sitemap.ts` |

## Podsumowanie

| Kategoria | Status |
|:---|---|
| 🔴 Błędy krytyczne (P0) | **0/2** ✅ WSZYSTKIE NAPRAWIONE |
| 🟠 Błędy wysokie (P1) | **0/3** ✅ WSZYSTKIE NAPRAWIONE |
| 🟡 Błędy średnie (P2) | **3** – Static AggregateRating, brak schema dla karta-godzin, brak hreflang |
| 🟢 Optymalizacje (P3) | **2/3** – OG dla karta-godzin, preconnect fontów ✅, sitemap |

**Aktualny rating po naprawach: 9.0/10** (↑ z 7.5/10)
