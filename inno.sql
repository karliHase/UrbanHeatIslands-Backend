--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 11.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: station; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.station (
    station_id character varying,
    temp integer,
    windspeed integer,
    neighborhood character varying
);


ALTER TABLE public.station OWNER TO postgres;

--
-- Data for Name: station; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.station (station_id, temp, windspeed, neighborhood) FROM stdin;
IVIENNA316	\N	\N	\N
IDONAU61	8	6	Donaustadt
IDONAU77	9	5	Donaustadt
IDONAU88	9	7	Donaustadt
IDONAU48	8	3	Donaustadt
IDONAU9	8	4	Donaustadt
IDONAU86	9	2	Donaustadt
IDONAU63	9	3	Donaustadt
IDONAU36	9	15	Donaustadt
IDONAU113	9	0	Donaustadt
IDONAU87	9	7	Donaustadt
IDONAU100	9	5	Donaustadt
IDONAU1	9	14	Donaustadt
IDONAU99	9	3	Donaustadt
IDONAU102	9	1	Donaustadt
IDONAU15	9	2	Donaustadt
IDONAU69	8	0	Donaustadt
IFLORI81	10	17	Floridsdorf
IDONAU89	8	4	Donaustadt
IDBLIN5	8	9	Döbling
IFLORI62	9	3	Floridsdorf
IFLORI62	9	3	Floridsdorf
IDONAU50	8	0	Donaustadt
IWHRIN7	10	3	Währing
IDONAU55	\N	\N	\N
ILIESI8	\N	\N	\N
ILIESI17	\N	\N	\N
ILIESI29	\N	\N	\N
ILIESI10	\N	\N	\N
IBRIGI5	\N	\N	\N
IWHRIN2	\N	\N	\N
IPENZI8	\N	\N	\N
IPENZI21	\N	\N	\N
IHIETZIN10	\N	\N	\N
IHIETZ5	\N	\N	\N
IMEIDL6	\N	\N	\N
ISIMME6	\N	\N	\N
ISIMMERI3	\N	\N	\N
IFAVOR3	\N	\N	\N
IFAVOR4	\N	\N	\N
IDONAU117	8	14	Donaustadt
IDONAU96	9	2	Donaustadt
IFLORI65	9	5	Floridsdorf
IDONAU45	9	1	Donaustadt
IDONAU114	9	3	Donaustadt
ILIESI2	8	6	Liesing
ILIESI18	9	14	Liesing
ILIESI19	9	8	Liesing
ILIESI30	8	8	Liesing
ILIESI11	8	6	Liesing
ILIESI3	8	2	Liesing
ILIESI32	9	4	Liesing
ILIESI24	9	6	Liesing
ILIESI21	8	4	Liesing
ILIESI5	9	7	Liesing
IBRIGI11	9	0	Brigittenau
IBRIGI14	9	4	Brigittenau
IDBLIN4	8	8	Döbling
IBRIGI9	8	17	Brigittenau
IDBLIN1	8	10	Döbling
IDBLIN6	8	7	Döbling
IDBLIN3	8	16	Döbling
IDBLIN2	9	11	Döbling
IWHRIN9	9	12	Währing
IWHRIN5	9	24	Währing
IHERNA18	8	10	Hernals
IHERNA12	8	2	Hernals
IOTTAK10	9	16	Ottakring
IHERNA14	9	13	Hernals
IOTTAK12	9	16	Ottakring
IOTTAK13	8	3	Ottakring
IOTTAK3	9	8	Ottakring
IRUDOL8	8	29	Rudolfsheim-Fünfhaus
IRUDOLFS16	8	22	City
IPENZI6	8	6	Penzing
IPENZI43	8	6	Penzing
IPENZI10	8	3	Penzing
IPENZI42	7	2	Penzing
IPENZI27	8	1	Penzing
IPENZI33	8	26	Penzing
IPENZI31	8	11	Penzing
IPENZI50	8	1	Penzing
IPENZI14	8	9	Penzing
IPENZI47	6	0	Penzing
IPENZI39	8	8	Penzing
IHIETZIN11	8	1	KGV Wattmanngasse
IHIETZIN9	8	5	au.home
IHIETZIN5	8	0	Vienna
IHIETZIN15	8	6	sonni
IHIETZ11	8	1	Hietzing
IHIETZ10	8	10	Hietzing
IHIETZ1	8	1	Hietzing
IMEIDL15	8	4	Meidling
IMEIDL16	8	4	Meidling
IMEIDL9	8	13	Meidling
IMEIDL17	9	7	Meidling
IMEIDLIN4	8	10	Hetzendorf
IMEIDLIN5	10	10	Vienna Schloeglgasse
ISIMME21	8	0	Simmering
ISIMME18	8	12	Simmering
ISIMME5	8	1	Simmering
ISIMME102	8	5	Simmering
ISIMME103	14	5	Simmering
ISIMME113	8	4	Simmering
ISIMMERI7	8	5	My Home
IFAVOR6	9	1	Favoriten
IFAVOR1	9	9	Favoriten
IFAVOR34	8	3	Favoriten
IFLORIDS6	8	4	Stammersdorf
IFAVOR23	8	0	Favoriten
IFAVOR5	7	0	Favoriten
IFAVOR2	10	0	Favoriten
IFLORI1	9	4	Floridsdorf
IFLORI98	9	9	Floridsdorf
IFLORI95	9	10	Floridsdorf
IFLORIDS5	9	8	Leopoldau
IFLORI12	9	16	Floridsdorf
IFLORI5	9	3	Floridsdorf
IWIENWIE47	9	7	Wien Floridsdorf
IFLORI104	9	15	Floridsdorf
IFLORI61	8	2	Floridsdorf
IFLORI113	9	22	Floridsdorf
IFLORI109	9	4	Floridsdorf
IFLORIDS3	8	8	Orasteig
IDONAU98	8	0	Donaustadt
IDONAU83	8	4	Donaustadt
IDONAU116	9	0	Donaustadt
IDONAU59	8	1	Donaustadt
IFAVOR31	8	2	Favoriten
IDONAU79	8	4	Donaustadt
IFAVORIT9	\N	\N	\N
IALSER6	\N	\N	\N
INEUBA8	\N	\N	\N
IMARIA92	\N	\N	\N
IMARIAHI2	\N	\N	\N
IWIEDE4	\N	\N	\N
ILANDS75	\N	\N	\N
ILEOPO50	\N	\N	\N
IMARIA118	3	0	Maria Laach am Jauerling
IMARIA18	9	7	Mariahilf
IMARGA1	9	8	Margareten
IMARIA40	0	0	Mariapfarr
IMARIA54	4	3	Maria Neustift
IWIEDE3	9	12	Wieden
IWIEDE9	9	9	Wieden
IWIEDE10	9	8	Wieden
IWIEDE13	9	8	Wieden
IWIEDEN4	2	21	Kleinpertenschlag
IWIEDEN14	3	1	easyweater
IWIEDEN16	-1	0	Alpengasthof Bidner Wetter
ILANDS73	8	3	Landstraße
ILEOPO52	9	22	Leopoldstadt
ILEOPO75	4	6	Leopoldschlag
ILEOPO53	8	5	Leopoldsdorf
ILEOPO51	4	4	Leopoldschlag
ILEOPO71	7	9	Leopoldsdorf im Marchfelde
ILEOPO60	9	2	Leopoldstadt
ILEOPO69	5	10	Leopoldschlag
ILEOPO77	9	10	Leopoldstadt
ILEOPO23	8	2	Leopoldsdorf
ILEOPO31	10	5	Leopoldstadt
ILEOPO74	7	0	Leopoldschlag
ILEOPOLD57	8	7	Breitstetten
ILEOPOLD59	8	4	Breitstetten
ILEOPOLD64	9	9	KGV Unterer Prater
IINNER5	3	0	Innerbraz
IINNER9	9	5	Innere Stadt
IINNER11	9	0	Innere Stadt
IVIENNA242	9	16	Aspern
IVIENNA341	9	5	Ville Verdi
IMARIA4	7	6	Maria Laach am Jauerling
IHERNA15	7	24	Hernals
IHERNA5	9	5	Hernals
IOTTAK18	8	3	Ottakring
IRUDOL1	9	0	Rudolfsheim-Fünfhaus
IRUDOL2	-40	24	Rudolfsheim-Fünfhaus
IOTTAK9	15	8	Ottakring
IPENZI11	8	9	Penzing
IPENZI5	8	1	Penzing
IPENZI34	5	3	Penzing
IPENZI40	7	10	Penzing
IVIENNA262	\N	\N	\N
IVIENNA337	\N	\N	\N
IVIENNA315	\N	\N	\N
IWIENWIE27	\N	\N	\N
IWIENWIE24	\N	\N	\N
IPENZI49	8	4	Penzing
IPENZI4	7	0	Penzing
IPENZI16	8	5	Penzing
IHIETZIN4	7	0	Lainzer Tiergarten
IHIETZIN12	8	5	Paradies
IHIETZ7	8	4	Hietzing
IHIETZ9	8	0	Hietzing
IMEIDL7	9	15	Meidling
IMEIDL10	8	13	Meidling
IMEIDLIN2	9	23	Sagedergasse 21A
IMEIDLIN7	8	8	Gartenfreunde XII
ISIMME16	9	6	Simmering
ISIMME101	8	5	Simmering
IFAVOR14	10	5	Favoriten
ISIMME12	15	6	Simmering
IFAVOR22	8	0	Favoriten
IFAVOR33	8	7	Favoriten
IFAVOR12	8	0	Favoriten
IFAVORIT3	9	11	Reumannplatz
IFAVORIT5	8	13	LAAERBERG
IFAVORIT4	8	12	Favoriten, nähe Raxstraße
IFAVORIT6	8	17	Raxstr. / Laxenburgerstr.
IALSER5	9	5	Alsergrund
IALSER4	9	17	Alsergrund
IALSER7	9	17	Alsergrund
IJOSEFST2	9	0	Town
IJOSEFST3	9	1	Hamerlingplatz Dachterasse
INEUBA7	9	12	Neubau
INEUBA1	10	3	Neubau
IMARIA91	1	0	Mariazell
INEUBAU4	10	4	Wien Neubau
IMARIA110	8	16	Maria Enzersdorf
ILEOPO28	4	6	Leopoldschlag
IWIENWIE4	9	14	1030 Wien
IVIENNA333	9	2	Kagran, Freihofsiedlung
IVIENNA338	9	3	Wien, Brigittenau
IVIENNA317	8	10	Ober St. Veit
IWIENWIE59	9	5	Ottakring
IWIENWIE25	8	2	1220 Wien Kagran
IVIENNA342	9	4	Satzingerweg
IWHRIN10	8	0	Währing
IWIENWIE87	9	11	Rothneusiedl
IWIENWIE52	9	5	Pretschgasse
IWIENWIE64	9	9	Stadlbreitener Anger
IWIENWIE7	8	21	1140 Wien Huetteldorf / Allianz-Stadion
IWIENWIE75	9	6	Mühlwasser
IWIENWIE80	\N	\N	\N
IWIENWIE37	\N	\N	\N
IWIENWIE61	\N	\N	\N
IWIENWIE54	\N	\N	\N
IWIENWIE21	7	2	1160 Wien Ottakring / Kuffner Sternwarte
IWIENWIE71	8	0	1130 Wien, Roter Berg
IWIENWIE84	9	16	Wien, Simmering, Lindenbauergasse
IMARIA20	3	0	Maria Neustift
IMARIA104	3	0	Maria Neustift
IMARIA129	8	4	Maria Lanzendorf
IMARIA71	2	0	Mariastein
IMARIA21	4	4	Maria Laach am Jauerling
IMARIA11	9	22	Mariahilf
IMARIA33	3	3	Maria Neustift
IMARIA64	3	6	Maria Schmolln
IMARIA44	8	9	Maria Enzersdorf
IMARIA75	3	6	Maria Laach am Jauerling
ILANDSTR3	9	6	Wien 3 Wohnpark Erdberg
IMARIA81	3	7	Maria Laach am Jauerling
IMARIA24	17	1	Maria Wörth
IMARIA22	0	2	Mariapfarr
IFLORI81	10	17	Floridsdorf
IWIENWIE15	8	5	Austria, Vienna, Aspern, Lobau
IWIENWIE13	9	13	Schafberg
\.


--
-- PostgreSQL database dump complete
--

