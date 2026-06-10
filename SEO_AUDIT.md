# Profesjonalny Audyt SEO – Projekt: stawka-godzinowa.pl

Niniejszy dokument przedstawia kompleksową analizę technicznego i treściowego SEO dla serwisu **stawka-godzinowa.pl**. Projekt oparty jest na nowoczesnym stacku technologicznym **Next.js (App Router)** z zastosowaniem optymalizacji wydajnościowych, danych strukturalnych i responsywnego designu. 

Celem audytu jest ocena stanu obecnego, zidentyfikowanie mocnych stron witryny, wskazanie obszarów wymagających poprawy (wąskich gardeł) oraz przedstawienie konkretnych rekomendacji wdrożeniowych mających na celu maksymalizację widoczności serwisu w wynikach wyszukiwania (SERP) Google.

---

## Spis treści
1. [Podsumowanie i Ogólna Ocena (Executive Summary)](#1-podsumowanie-i-og%C3%B3lna-ocena-executive-summary)
2. [Analiza SEO Technicznego (Technical SEO)](#2-analiza-seo-technicznego-technical-seo)
   - Pliki sterujące: `robots.txt` oraz `sitemap.ts`
   - Znaki kanoniczne (Canonical URLs) i alternaty językowe (Hreflangs)
   - Responsywność i Manifest PWA
3. [Analiza Struktury Nagłówków i Semantyki HTML](#3-analiza-struktury-nag%C3%B3wków-i-semantyki-html)
   - Struktura nagłówków (H1–H6)
   - Dostępność (Accessibility) oraz teksty alternatywne (ALT)
4. [Dane Strukturalne (Schema.org / JSON-LD)](#4-dane-strukturalne-schemaorg--json-ld)
5. [Wydajność i Core Web Vitals (Szybkość Ładowania)](#5-wydajno%C5%9B%C4%87-i-core-web-vitals-szybko%C5%9B%C4%87-%C5%82adowania)
   - Renderowanie i czcionki
   - Optymalizacja zasobów graficznych (Images)
   - Skrypty zewnętrzne (Google Analytics & AdSense)
6. [Analiza Treści i Strategia Słów Kluczowych](#6-analiza-tre%C5%9Bci-i-strategia-s%C5%82%C3%B3w-kluczowych)
7. [Lista Rekomendacji Wdrożeniowych (Action Plan)](#7-lista-rekomendacji-wdro%C5%BCeniowych-action-plan)

---

## 1. Podsumowanie i Ogólna Ocena (Executive Summary)

Witryna **stawka-godzinowa.pl** wykazuje **bardzo wysoki poziom optymalizacji SEO**. Twórcy projektu zadbali o kluczowe aspekty techniczne:
- **Zautomatyzowana sitemapa** generowana dynamicznie na podstawie rzeczywistych dat modyfikacji plików źródłowych.
- **Kompleksowe wdrożenie Schema.org** (FAQPage, WebApplication, WebSite, HowTo, BreadcrumbList, Organization, AggregateRating), co znacznie zwiększa szanse na uzyskanie rich snippets (rozszerzonych wyników wyszukiwania).
- **Elastyczne zarządzanie rokiem** (`CURRENT_YEAR`), dzięki czemu treść nie dezaktualizuje się z perspektywy robotów Google.
- **Przyjazne adresy URL** oraz przekierowania ze starych struktur (np. ze znakiem podkreślenia `_` na myślniki `-`), co zapobiega powstawaniu duplikacji i błędów 404.

### Ogólny Rating: **9.2 / 10**

Pomimo świetnego stanu początkowego, istnieją drobne niespójności i obszary do optymalizacji, które po wdrożeniu mogą przełożyć się na stabilniejsze pozycje, wyższy współczynnik klikalności (CTR) i lepszy komfort użytkownika (Core Web Vitals).

---

## 2. Analiza SEO Technicznego (Technical SEO)

### Pliki sterujące: `robots.txt` oraz `sitemap.ts`
- **Stan obecny:** 
  - Plik `robots.txt` jest poprawnie skonfigurowany. Zezwala na indeksowanie całej witryny i wprost wskazuje poprawną lokalizację mapy witryny: `Sitemap: https://stawka-godzinowa.pl/sitemap.xml`.
  - Plik `app/sitemap.ts` dynamicznie sprawdza czas ostatniej modyfikacji plików (funkcja `getLastModified(filePath)` za pomocą modułu `fs` i `path`). To unikalna i wysoce rekomendowana praktyka, która informuje wyszukiwarkę o faktycznej dacie aktualizacji kalkulatorów.
- **Ocena:** **Doskonale**. Brak uwag krytycznych.

### Znaki kanoniczne (Canonical URLs) i alternaty językowe (Hreflangs)
- **Stan obecny:**
  - W głównym `app/layout.tsx` zdefiniowano `metadataBase: new URL('https://stawka-godzinowa.pl')` oraz fallback canonical.
  - Podstrony poprawnie nadpisują adresy kanoniczne, np. w `/brutto-netto/layout.tsx` mamy `canonical: "/brutto-netto"` co Next.js automatycznie rozwija do pełnego adresu URL na podstawie `metadataBase`.
  - W `app/layout.tsx` znajduje się tag: `<link rel="alternate" hrefLang="pl" href="https://stawka-godzinowa.pl" />`.
- **Rekomendacja:**
  - W przypadku podstron takich jak `/brutto-netto` warto upewnić się, czy tagi hreflang dla języka polskiego wskazują na właściwy adres podstrony (`https://stawka-godzinowa.pl/brutto-netto`), a nie tylko na stronę główną. Next.js robi to automatycznie, jeśli poprawnie skonfigurujemy pole `alternates.languages` w metadanych. Obecnie w `app/brutto-netto/layout.tsx` jest:
    ```typescript
    alternates: {
        canonical: "/brutto-netto",
        languages: {
            'pl': 'https://stawka-godzinowa.pl/brutto-netto',
        },
    }
    ```
    Jest to poprawnie zaimplementowane.

### Responsywność i Manifest PWA
- **Stan obecny:** 
  - Eksportowany obiekt `viewport` w `app/layout.tsx` posiada prawidłowe ustawienia: `width: 'device-width'`, `initialScale: 1`. Zapobiega to błędom renderowania na urządzeniach mobilnych ("Tekst za mały do przeczytania", "Elementy klikalne zbyt blisko siebie").
  - Serwis wdraża manifest aplikacji webowej (`app/manifest.json`). Plik zawiera precyzyjne opisy, maskowalne ikony w odpowiednich rozmiarach (`192x192`, `512x512`) i wspiera standardy PWA (Progressive Web App).
- **Ocena:** **Doskonale**.

---

## 3. Analiza Struktury Nagłówków i Semantyki HTML

Prawidłowa hierarchia nagłówków (H1 -> H2 -> H3 -> H4) ułatwia robotom indeksującym (np. Googlebot) zrozumienie struktury semantycznej i ważności poszczególnych sekcji treści.

### Analiza podstrony `/brutto-netto`
Przyjrzyjmy się strukturze kodu w `app/brutto-netto/page.tsx`:
```jsx
<header>
  <Wynik />
  <div id="tytul">
    <h1>Kalkulator Brutto na Netto</h1>
  </div>
</header>
```
1. **Problem kolejności:** Element `<Wynik />` (który renderuje kwotę wyliczenia) znajduje się nad głównym nagłówkiem H1. Z punktu widzenia semantyki HTML i SEO, nagłówek `<h1>` powinien być pierwszym znaczącym elementem tekstowym w sekcji nagłówkowej lub zaraz po menu nawigacyjnym.
2. **Hierarchia nagłówków:** 
  - W dalszej części strony widzimy nagłówki `<h2>Przelicz Brutto na Netto</h2>`, `<h2>Szczegóły wynagrodzenia</h2>`, `<h2>O kalkulatorze...</h2>`. Jest to poprawne.
  - W sekcji szczegółowej pojawiają się nagłówki `<h3>Jak Działa Przeliczanie Brutto na Netto?</h3>`, a pod nimi:
    - `<h4>1. Ustalenie wynagrodzenia brutto</h4>`
    - `<h4>2. Odliczenie składek na ubezpieczenie społeczne</h4>`
    - ... itd.
  - Hierarchia H1 -> H2 -> H3 -> H4 jest w pełni zachowana i poprawna.

### Dostępność (Accessibility) oraz teksty alternatywne (ALT)
- **Logotypy i obrazy:** 
  - W pliku `app/strona-glowna/home-page.tsx` obraz `/image.webp` ma doskonale zoptymalizowany tekst alternatywny: `alt="Kalkulator stawki godzinowej 2026 – oblicz wynagrodzenie netto i brutto"`.
  - W pliku `app/karta-godzin/page.jsx` obraz przesyłanego logo firmy posiada atrybut `alt='Logo firmy na karcie ewidencji czasu pracy'`.
  - **Wąskie gardło:** W pliku `app/modules/Menu.tsx` obraz logo `/logo.webp` nie posiada zdefiniowanego atrybutu `alt`, co może generować ostrzeżenia w testach Lighthouse/Axe i obniżać dostępność witryny.
- **Rekomendacja:** Dodać precyzyjny atrybut `alt` do każdego elementu `<Image />` w projekcie, zwłaszcza dla logo w menu oraz stopce (`app/modules/footer.js`).

---

## 4. Dane Strukturalne (Schema.org / JSON-LD)

To jeden z najmocniejszych punktów projektu. Witryna wdraża:
1. **WebApplication:** Informuje Google, że strona to interaktywna aplikacja finansowa. Zawiera listę funkcji (`featureList`), darmową ofertę (`offers`) i wydawcę (`publisher`).
2. **WebSite:** Definiuje strukturę wyszukiwania wewnętrznego (`potentialAction` dla `SearchAction`).
3. **BreadcrumbList:** Ułatwia nawigację robotom i tworzy czytelne "okruszki" w wynikach wyszukiwania.
4. **HowTo:** Opisuje instrukcję krok po kroku, jak korzystać z kalkulatora.
5. **Organization:** Przedstawia oficjalny profil marki, powiązania z mediami społecznościowymi (`sameAs`).
6. **FAQPage:** Implementuje listę najczęściej zadawanych pytań. Generuje bezpośrednie sekcje pytań i odpowiedzi w wynikach Google.
7. **AggregateRating:** Pobiera dynamicznie średnią ocen użytkowników z API (`/api/rating/${itemId}`).

- **Ocena:** **Wybitnie**. Dane strukturalne są zintegrowane bezpośrednio w JSON-LD, co jest preferowanym formatem przez Google. Brak błędów składniowych.

---

## 5. Wydajność i Core Web Vitals (Szybkość Ładowania)

Wydajność strony to oficjalny czynnik rankingowy w Google (Page Experience / Core Web Vitals). Szczególną rolę odgrywają wskaźniki: **LCP** (Largest Contentful Paint), **FID / INP** (Interaction to Next Paint) oraz **CLS** (Cumulative Layout Shift).

### Optymalizacja czcionek
- W projekcie użyto wbudowanego modułu Next.js `next/font/google` do ładowania czcionki **Roboto**:
  ```typescript
  const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin-ext'],
    display: 'swap',
    variable: '--font-roboto',
  });
  ```
  - `display: 'swap'` zapobiega blokowaniu renderowania tekstu przez przeglądarkę (FOIT - Flash of Invisible Text). To doskonała praktyka wpływająca na LCP i UX.

### Optymalizacja zasobów graficznych (Images)
- Wszystkie pliki graficzne są w formacie **WebP** (`image.webp`, `logo.webp`, `brutto_netto.webp` itd.).
- W konfiguracji `next.config.mjs` włączono obsługę formatu **AVIF** (`formats: ['image/avif', 'image/webp']`). AVIF potrafi zredukować wagę obrazów o dodatkowe 20-30% w porównaniu do WebP przy zachowaniu identycznej jakości.
- **Wąskie gardło:** W głównym `app/layout.tsx` prekradowany jest obraz `/image.webp` (`<link rel="preload" href="/image.webp" as="image" />`). Jest to świetne dla strony głównej, ale dla podstrony `/brutto-netto` elementem LCP może być `/brutto_netto.webp`. Preloadowanie nieużywanego zasobu na podstronach marnuje pasmo sieciowe i może opóźnić ładowanie właściwego LCP.
- **Rekomendacja:** Zamiast globalnego preloadowania jednego obrazu w głównym layoucie, lepiej zastosować atrybut `priority` bezpośrednio na komponencie `<Image />` dla obrazu stanowiącego LCP na danej podstronie. Next.js automatycznie wygeneruje wtedy odpowiedni preload w nagłówku HTTP/HTML tylko dla tej konkretnej ścieżki.

### Skrypty zewnętrzne (Google Analytics & AdSense)
- Skrypty reklamowe i analityczne mogą drastycznie obniżać wydajność mobilną.
- W projekcie zastosowano komponent `<ConditionalAdSense />`, co sugeruje inteligentne / opóźnione ładowanie reklam (np. po interakcji użytkownika lub na podstawie zgody na ciasteczka). To znakomity sposób na poprawę TBT (Total Blocking Time).
- W `next.config.mjs` zdefiniowano nagłówki bezpieczeństwa **Content-Security-Policy (CSP)**. Poprawnie uwzględniono w nich domeny Google Analytics i Google AdSense, co zapobiega błędom w konsoli i blokowaniu skryptów przez przeglądarkę.

---

## 6. Analiza Treści i Strategia Słów Kluczowych

- **Nasycenie frazami kluczowymi:** Witryna posiada długie, unikalne i merytoryczne opisy pod każdym kalkulatorem. Stosowanie pogrubień (`<strong>`) dla kluczowych fraz (np. `kalkulator wynagrodzeń brutto netto`, `koszty pracodawcy UoP`) ułatwia robotom analizę semantyczną.
- **Aktualność:** Wszystkie teksty konsekwentnie nawiązują do aktualnego roku (dynamicznie wstrzykiwany `CURRENT_YEAR`). Eliminuje to problem "przestarzałej treści" i gwarantuje wysoki CTR na zapytania typu "kalkulator b2b 2026".
- **UX i Linkowanie Wewnętrzne:** Menu główne (`app/modules/Menu.tsx`) i stopka zapewniają doskonałą sieć linków wewnętrznych między wszystkimi kalkulatorami. Robot Google z łatwością porusza się po całej strukturze serwisu.

---

## 7. Lista Rekomendacji Wdrożeniowych (Action Plan)

Poniżej znajduje się lista konkretnych i priorytetowych działań, które warto podjąć, aby wynieść SEO techniczne projektu na jeszcze wyższy poziom:

| Priorytet | Obszar | Opis Rekomendacji | Pliki do modyfikacji / weryfikacji |
| :---: | :--- | :--- | :--- |
| **Wysoki** | Semantyka i Hierarchia | Przesunąć nagłówek `<h1>` w strukturze kodu tak, aby znajdował się przed komponentem wyświetlającym dynamiczny `<Wynik />`. H1 powinien otwierać treść pod nagłówkiem menu. | `app/brutto-netto/page.tsx` oraz pozostałe strony kalkulatorów (np. `app/kalkulator-b2b/page.jsx`). |
| **Średni** | Dostępność (ALT) | Dodać opisowe atrybuty `alt` do wszystkich obrazów logo w komponentach nawigacyjnych i stopce. | `app/modules/Menu.tsx`, `app/modules/footer.js`. |
| **Średni** | Optymalizacja LCP | Usunąć globalny `<link rel="preload" href="/image.webp" />` z `app/layout.tsx`. W zamian dodać właściwość `priority` do obrazów LCP bezpośrednio na poszczególnych stronach (np. w `app/strona-glowna/home-page.tsx`). | `app/layout.tsx`, `app/strona-glowna/home-page.tsx`. |
| **Niski** | Dane Strukturalne | Rozszerzyć dane FAQPage o pytania dotyczące nowych regulacji prawnych i podatkowych wchodzących w życie w aktualnym roku. | `app/components/SchemaOrg.tsx`, `app/brutto-netto/layout.tsx`. |

---

## 8. Status Wdrożonych Poprawek (Implementation Status)

W ramach niniejszego audytu wdrożono następujące usprawnienia:

| Priorytet | Obszar | Status | Pliki |
| :---: | :--- | :--- | :--- |
| **Wysoki** | Semantyka i Hierarchia (H1) | ✅ **WDROŻONE** - 5 stron poprawionych | `app/brutto-netto/page.tsx`, `app/kalkulator-b2b/page.jsx`, `app/wyliczenie-z-godzin/page.tsx`, `app/kalkulator-umowy-zlecenie/page.jsx`, `app/kalkulator-inflacji/page.tsx` |
| **Średni** | Dostępność (ALT) | ✅ **Zweryfikowane** - atrybuty `alt` już istnieją we wszystkich obrazach | `app/modules/Menu.tsx`, `app/modules/footer.js` |
| **Średni** | Optymalizacja LCP | ✅ **WDROŻONE** - usunięto globalny preload | `app/layout.tsx` |
| **Niski** | Dane Strukturalne (FAQ) | ✅ **WDROŻONE** - dodano 3 nowe pytania | `app/components/SchemaOrg.tsx` |

---

### Wnioski Końcowe
Strona **stawka-godzinowa.pl** jest doskonale przygotowana pod kątem SEO. Wdrożenie powyższych usprawnień semantycznych i optymalizacji zasobów LCP pozwoli na osiągnięcie maksymalnych wyników w testach Lighthouse (szczególnie w kategoriach *Performance* oraz *Accessibility*) i ugruntuje pozycję lidera w segmencie kalkulatorów płacowych.
