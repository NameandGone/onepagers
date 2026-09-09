<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sitemap xhtml">
  <xsl:output method="html" encoding="UTF-8" omit-xml-declaration="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    <xsl:variable name="urlCount" select="count(sitemap:urlset/sitemap:url)"/>
    <xsl:variable name="mapCount" select="count(sitemap:sitemapindex/sitemap:sitemap)"/>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="A readable XML sitemap for onepagers."/>
        <title>onepagers / sitemap</title>
        <style>
          :root {
            color-scheme: light;
            --ink: #142943;
            --muted: #667b93;
            --faint: #8da0b4;
            --line: #dce5ef;
            --canvas: #f5f8fc;
            --card: #ffffff;
            --blue: #2862d5;
            --blue-soft: #edf3ff;
          }

          * { box-sizing: border-box; }

          body {
            margin: 0;
            min-height: 100vh;
            background:
              radial-gradient(circle at 15% 0%, rgba(40, 98, 213, .08), transparent 34rem),
              var(--canvas);
            color: var(--ink);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          a { color: inherit; }

          .shell {
            width: min(1180px, calc(100% - 40px));
            margin: 0 auto;
            padding: 52px 0 76px;
          }

          .topline {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            margin-bottom: 52px;
          }

          .brand {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: var(--ink);
            font: 700 13px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            letter-spacing: .08em;
            text-transform: uppercase;
          }

          .brand-mark {
            position: relative;
            display: inline-grid;
            width: 28px;
            height: 28px;
            place-items: center;
            overflow: hidden;
            border: 1px solid var(--blue);
            border-radius: 9px;
            color: var(--blue);
            font-size: 10px;
            letter-spacing: -.08em;
          }

          .brand-mark::after {
            position: absolute;
            right: 4px;
            bottom: 4px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--blue);
            content: "";
          }

          .format {
            color: var(--muted);
            font: 600 11px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            letter-spacing: .08em;
            text-transform: uppercase;
          }

          .hero {
            max-width: 760px;
            margin-bottom: 34px;
          }

          .eyebrow {
            margin: 0 0 16px;
            color: var(--blue);
            font: 700 11px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            letter-spacing: .14em;
            text-transform: uppercase;
          }

          h1 {
            max-width: 700px;
            margin: 0;
            font: 700 clamp(34px, 5vw, 64px)/.98 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            letter-spacing: -.075em;
          }

          .lede {
            max-width: 650px;
            margin: 20px 0 0;
            color: var(--muted);
            font-size: 17px;
            line-height: 1.65;
          }

          .stats {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 26px;
          }

          .stat {
            display: inline-flex;
            align-items: baseline;
            gap: 8px;
            padding: 10px 13px;
            border: 1px solid var(--line);
            border-radius: 999px;
            background: rgba(255, 255, 255, .72);
            color: var(--muted);
            font-size: 12px;
          }

          .stat strong {
            color: var(--ink);
            font: 700 15px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }

          .map-card {
            overflow: hidden;
            border: 1px solid #cfdbe8;
            border-radius: 22px;
            background: var(--card);
            box-shadow: 0 20px 50px rgba(20, 41, 67, .08);
          }

          .map-heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            padding: 20px 24px;
            border-bottom: 1px solid var(--line);
          }

          .map-heading h2 {
            margin: 0;
            font-size: 15px;
            font-weight: 700;
          }

          .map-heading p {
            margin: 4px 0 0;
            color: var(--muted);
            font-size: 12px;
          }

          .map-badge {
            flex: 0 0 auto;
            padding: 7px 10px;
            border-radius: 999px;
            background: var(--blue-soft);
            color: var(--blue);
            font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            letter-spacing: .1em;
            text-transform: uppercase;
          }

          .table-head,
          .url-row {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 130px 84px;
            gap: 20px;
            align-items: center;
          }

          .table-head {
            padding: 13px 24px;
            background: #f8fafd;
            color: var(--faint);
            font: 700 10px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            letter-spacing: .1em;
            text-transform: uppercase;
          }

          .url-row {
            min-height: 76px;
            padding: 15px 24px;
            border-top: 1px solid var(--line);
            text-decoration: none;
            transition: background-color 160ms ease, transform 160ms ease;
          }

          .url-row:hover {
            background: #fbfdff;
          }

          .url-row:focus-visible {
            position: relative;
            z-index: 1;
            outline: 3px solid rgba(40, 98, 213, .26);
            outline-offset: -3px;
          }

          .url-cell {
            display: flex;
            min-width: 0;
            align-items: center;
            gap: 14px;
          }

          .row-number {
            display: grid;
            width: 30px;
            height: 30px;
            flex: 0 0 auto;
            place-items: center;
            border: 1px solid var(--line);
            border-radius: 9px;
            color: var(--blue);
            font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }

          .url-copy {
            display: block;
            min-width: 0;
          }

          .url {
            display: block;
            overflow: hidden;
            color: var(--ink);
            font-size: 13px;
            font-weight: 650;
            line-height: 1.4;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .alternates {
            display: block;
            margin-top: 4px;
            color: var(--muted);
            font-size: 11px;
            line-height: 1.3;
          }

          .row-cadence,
          .row-priority {
            color: var(--muted);
            font-size: 12px;
          }

          .row-priority {
            color: var(--ink);
            font: 700 12px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }

          .mobile-label {
            display: none;
          }

          .footer {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-top: 18px;
            color: var(--faint);
            font-size: 11px;
            line-height: 1.5;
          }

          .footer code {
            color: var(--muted);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }

          @media (max-width: 760px) {
            .shell {
              width: min(100% - 24px, 640px);
              padding: 28px 0 44px;
            }

            .topline {
              margin-bottom: 36px;
            }

            .format {
              display: none;
            }

            .hero {
              margin-bottom: 24px;
            }

            h1 {
              font-size: clamp(30px, 11vw, 48px);
            }

            .lede {
              font-size: 15px;
            }

            .map-heading,
            .table-head,
            .url-row {
              padding-right: 16px;
              padding-left: 16px;
            }

            .map-heading {
              align-items: flex-start;
            }

            .table-head {
              display: none;
            }

            .url-row {
              grid-template-columns: 1fr auto;
              gap: 10px 16px;
              min-height: 0;
            }

            .url-cell {
              grid-column: 1 / -1;
            }

            .row-cadence,
            .row-priority {
              display: flex;
              align-items: baseline;
              gap: 6px;
            }

            .mobile-label {
              display: inline;
              color: var(--faint);
              font: 700 9px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              letter-spacing: .08em;
              text-transform: uppercase;
            }

            .url {
              white-space: normal;
              overflow-wrap: anywhere;
            }

            .footer {
              display: block;
            }

            .footer span {
              display: block;
            }

            .footer span + span {
              margin-top: 4px;
            }
          }
        </style>
      </head>
      <body>
        <main class="shell">
          <div class="topline">
            <div class="brand">
              <span class="brand-mark">XML</span>
              <span>onepagers / sitemap</span>
            </div>
            <span class="format">machine-readable index</span>
          </div>

          <header class="hero">
            <p class="eyebrow">onepagers / discovery map</p>
            <h1>Every useful page, in one place.</h1>
            <p class="lede">A clean index for search engines, AI crawlers, and curious humans. Follow a page to open it, or submit this XML directly to your search console.</p>
            <div class="stats">
              <span class="stat">
                <strong>
                  <xsl:choose>
                    <xsl:when test="$urlCount &gt; 0"><xsl:value-of select="$urlCount"/></xsl:when>
                    <xsl:otherwise><xsl:value-of select="$mapCount"/></xsl:otherwise>
                  </xsl:choose>
                </strong>
                <span><xsl:choose><xsl:when test="$urlCount &gt; 0">indexable URLs</xsl:when><xsl:otherwise>nested sitemaps</xsl:otherwise></xsl:choose></span>
              </span>
              <span class="stat"><strong>XML</strong><span>protocol-valid source</span></span>
              <span class="stat"><strong>24/7</strong><span>available to crawlers</span></span>
            </div>
          </header>

          <section class="map-card" aria-label="Sitemap entries">
            <div class="map-heading">
              <div>
                <h2>Indexable routes</h2>
                <p>Use the original XML feed for automated discovery.</p>
              </div>
              <span class="map-badge">sitemap.xml</span>
            </div>

            <xsl:choose>
              <xsl:when test="$urlCount &gt; 0">
                <div class="table-head">
                  <span>Page URL</span>
                  <span>Cadence</span>
                  <span>Priority</span>
                </div>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <a class="url-row" href="{sitemap:loc}" target="_blank" rel="noreferrer">
                    <span class="url-cell">
                      <span class="row-number"><xsl:number level="single" count="sitemap:url" format="001"/></span>
                      <span class="url-copy">
                        <span class="url"><xsl:value-of select="sitemap:loc"/></span>
                        <span class="alternates"><xsl:value-of select="count(xhtml:link)"/> language references including x-default</span>
                      </span>
                    </span>
                    <span class="row-cadence"><span class="mobile-label">Cadence</span><xsl:value-of select="sitemap:changefreq"/></span>
                    <span class="row-priority"><span class="mobile-label">Priority</span><xsl:value-of select="sitemap:priority"/></span>
                  </a>
                </xsl:for-each>
              </xsl:when>
              <xsl:when test="$mapCount &gt; 0">
                <div class="table-head">
                  <span>Nested sitemap</span>
                  <span>Last updated</span>
                  <span>Type</span>
                </div>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <a class="url-row" href="{sitemap:loc}" target="_blank" rel="noreferrer">
                    <span class="url-cell">
                      <span class="row-number"><xsl:number level="single" count="sitemap:sitemap" format="001"/></span>
                      <span class="url-copy">
                        <span class="url"><xsl:value-of select="sitemap:loc"/></span>
                        <span class="alternates">Nested sitemap document</span>
                      </span>
                    </span>
                    <span class="row-cadence"><span class="mobile-label">Last updated</span><xsl:value-of select="sitemap:lastmod"/></span>
                    <span class="row-priority"><span class="mobile-label">Type</span>XML</span>
                  </a>
                </xsl:for-each>
              </xsl:when>
              <xsl:otherwise>
                <div style="padding: 28px 24px; color: #667b93; font-size: 14px;">No sitemap entries were found.</div>
              </xsl:otherwise>
            </xsl:choose>
          </section>

          <footer class="footer">
            <span>For bots: <code>application/xml</code> · For people: a readable view.</span>
            <span>Canonical source generated by onepagers.</span>
          </footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

