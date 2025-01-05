import CookieConsent, { Cookies } from "react-cookie-consent";
import Link from "next/link";

const Cookie = () => <div><CookieConsent buttonText="Rozumiem" style={{ background: "#2B373B" }} buttonStyle={{ color: "black", fontSize: "13px", backgroundColor: "white" }}>Ta strona używa plików cookies, aby zapewnić najlepsze doświadczenie użytkownika. Kontynuując korzystanie ze strony, wyrażasz na to zgodę - <Link style={{color:'orange'}} href="/cookies_info">więcej informacji.</Link></CookieConsent></div>;

export default Cookie;