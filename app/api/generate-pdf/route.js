
import { NextResponse } from 'next/server';

import { getMovableHolidays } from '../../karta_godzin/holidays';

export async function POST(req) {
    try {
        const { month, year, logo } = await req.json();

        if (!month || !year) {
            return NextResponse.json({ error: 'Month and year are required' }, { status: 400 });
        }

        // PDF generation logic
        let browser;
        if (process.env.NODE_ENV === 'production') {
            const chromium = await import('@sparticuz/chromium');
            const puppeteer = await import('puppeteer-core');

            // Configure chromium
            // @sparticuz/chromium-min needs a specific pack for fonts if strictly necessary, 
            // generally default chromium works if we don't need exotic fonts.
            // Using standard @sparticuz/chromium package which includes a binary.

            // Note: .default might be needed depending on ESM/CJS interop, checking imports safety
            const chromiumLib = chromium.default || chromium;
            const puppeteerLib = puppeteer.default || puppeteer;

            browser = await puppeteerLib.launch({
                args: chromiumLib.args,
                defaultViewport: chromiumLib.defaultViewport,
                executablePath: await chromiumLib.executablePath(),
                headless: chromiumLib.headless,
                ignoreHTTPSErrors: true,
            });
        } else {
            // Local development
            const puppeteer = await import('puppeteer');
            const puppeteerLib = puppeteer.default || puppeteer;
            browser = await puppeteerLib.launch();
        }

        const page = await browser.newPage();

        // Reconstruct the HTML content
        // We need to duplicate the logic from page.jsx or move it to a shared place.
        // For now, to keep it robust, I will reimplement the specific rendering logic here.

        // Calculate days
        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);

        // Logic from page.jsx
        let l;
        const monthStrVal = monthInt;

        if (monthInt === 2 && yearInt % 400 === 0) l = 29;
        else if (monthInt === 2 && yearInt % 100 === 0) l = 28;
        else if (monthInt === 2 && yearInt % 4 === 0) l = 29;
        else if (monthInt === 2 && yearInt % 4 !== 0) l = 28;
        else if ([1, 3, 5, 7, 8, 10, 12].includes(monthInt)) l = 31;
        else l = 30;

        const monthNames = [
            "", "styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec",
            "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
        ];
        const monthName = monthNames[monthInt];
        const monthPre = monthInt < 10 ? `0${monthInt}` : monthInt;

        const firstDayOfMonth = new Date(yearInt, monthInt - 1, 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        const sobota = dayOfWeek === 6 ? 1 : (7 - dayOfWeek);
        const niedziela = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);

        const movableHolidays = getMovableHolidays(yearInt);

        const isMovableHoliday = (d, m) => {
            return movableHolidays.some(holiday => holiday.day === d && holiday.month === m);
        };

        let rowsHtml = '';
        for (let i = 1; i <= l; i++) {
            const isSunday = (i === niedziela || i === niedziela + 7 || i === niedziela + 14 || i === niedziela + 21 || i === niedziela + 28 || i === niedziela + 35);
            const isFixedHoliday = (i === 1 && (monthName === "styczeń" || monthName === "maj" || monthName === "listopad")) ||
                (i === 6 && monthName === "styczeń") ||
                (i === 3 && monthName === "maj") ||
                (i === 15 && monthName === "sierpień") ||
                (i === 11 && monthName === "listopad") ||
                (i === 24 && monthName === "grudzień") ||
                (i === 25 && monthName === "grudzień") ||
                (i === 26 && monthName === "grudzień");
            const isMovable = isMovableHoliday(i, monthInt);

            let rowClass = '';
            if (isSunday || isFixedHoliday || isMovable) {
                rowClass = 'holiday';
            } else if (i === sobota || i === sobota + 7 || i === sobota + 14 || i === sobota + 21 || i === sobota + 28) {
                rowClass = 'saturday';
            }

            const dateStr = `<b>${i}</b>.${monthPre}.${yearInt}`;
            rowsHtml += `
            <tr class="${rowClass}">
                <td>${dateStr}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        `;
        }

        const logoHtml = logo ? `<div class="logo"><img src="${logo}" alt="logo" /></div>` : '';

        const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
            body { 
                font-family: 'Roboto', sans-serif; 
                margin: 0; 
                padding: 15px; 
                box-sizing: border-box;
                width: 615px; 
                margin: 0 auto;
            }
            .container {
                position: relative;
                width: 100%;
            }
            .logo { 
                position: absolute; 
                right: 0; 
                top: 0;
                width: 100px;
                height: auto; 
                max-height: 100px;
            }
            .logo img { width: 100%; height: auto; object-fit: contain; }
            .title { text-align: center; color: #333; margin-bottom: 15px; padding-top: 10px; } /* Added padding-top to ensure title isn't too close to top edge if logo is large */
            .title h2 { margin: 0; font-weight: 500; font-size: 22px; }
            .month { text-align: center; font-size: 17px; margin-bottom: 15px; }
            .enploy { margin-bottom: 15px; font-size: 13px; }
            .enploy em { font-style: italic; color: #555; }
            .hr { border: 0; border-top: 1px dotted #999; margin: 3px 0 12px 0; width: 75%; } /* Set width to 75% */
            table { width: 100%; border-collapse: collapse; margin-top: 55px; font-size: 13px; }
            th, td { border: 1px solid #333; padding: 3px 2px; text-align: center; }
            th { background-color: #f0f0f0; font-weight: bold; }
            .holiday td { background-color: #ffe6e6; color: #d00; }
            .saturday td { background-color: #e6f7ff; color: #0066cc; }
            .sign { margin-top: 50px; text-align: right; }
            .signHr { width: 200px; display: inline-block; border: 0; border-top: 1px dashed #333; margin-bottom: 5px; }
            .sign em { display: block; font-size: 11px; margin-right: 40px;}
            .uwagi { width: 130px; }
            b { font-weight: 700; }
            .noborder { border: none !important; }
        </style>
    </head>
    <body>
        <div class="container">
            ${logoHtml}
            <div class="title"><h2>Karta Godzin Pracy</h2></div>
            <div class="month"><b>${monthName} ${yearInt}</b></div>
            
            <div class="enploy">
                <em>pracownik:</em><hr class="hr" />
                <br />
                <em>stanowisko:</em><hr class="hr" />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>ROZPO.</th>
                        <th>ZAKOŃ.</th>
                        <th>GODZ.</th>
                        <th>PODPIS</th>
                        <th class="uwagi">UWAGI</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                    <tr>
                        <td class="noborder"></td>
                        <td class="noborder"></td>
                        <td class="noborder"><b>SUMA:</b></td>
                        <td></td>
                        <td class="noborder"></td>
                        <td class="noborder"></td>
                    </tr>
                </tbody>
            </table>

            <div class="sign">
                 <hr class="signHr" />
                 <br />
                 <em>podpis przełożonego</em>
            </div>
        </div>
    </body>
    </html>
    `;

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
        });

        await browser.close();

        return new NextResponse(pdf, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="karta_godzin_${monthName}_${year}.pdf"`,
            },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
    }
}
