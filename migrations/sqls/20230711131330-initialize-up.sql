/* Replace with your SQL commands */

/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.fasilitas
(
    nama_fasilitas character varying(255) COLLATE pg_catalog."default",
    deskripsi text COLLATE pg_catalog."default",
    id_fasilitas character varying(4) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Fasilitas_pkey" PRIMARY KEY (id_fasilitas),
    CONSTRAINT unique_fasilitas_id UNIQUE (id_fasilitas)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.fasilitas
    OWNER to postgres;

ALTER SEQUENCE public.penyewa_id_penyewa_seq
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.penyewa
(
    id_penyewa SERIAL,
    nama character varying(255) COLLATE pg_catalog."default" NOT NULL,
    no_telp character varying(14) COLLATE pg_catalog."default" NOT NULL,
    alamat text COLLATE pg_catalog."default" NOT NULL,
    tanggal_pesan date NOT NULL,
    id_fasilitas character varying(4) COLLATE pg_catalog."default" NOT NULL,
    status character varying(25) COLLATE pg_catalog."default" DEFAULT 'Booking'::character varying,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Penyewa_pkey" PRIMARY KEY (id_penyewa),
    CONSTRAINT "Penyewa_id_fasilitas_fkey" FOREIGN KEY (id_fasilitas)
        REFERENCES public.fasilitas (id_fasilitas) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)


TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.penyewa
    OWNER to postgres;
-- Index: fki_fasilitas

-- DROP INDEX IF EXISTS public.fki_fasilitas;

CREATE INDEX IF NOT EXISTS fki_fasilitas
    ON public.penyewa USING btree
    (id_fasilitas COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;


INSERT INTO public.fasilitas(nama_fasilitas, deskripsi, id_fasilitas) VALUES ('Al Hilal', 'Penyewaan Gedung', 'ACA');
INSERT INTO public.penyewa(nama, no_telp, alamat, tanggal_pesan, id_fasilitas, email)
	VALUES ('DAVID AFDAL KAIZAR MUTAHADI', '081933174900', 'Pondok Cina', '07-06-2023', 'ACA', 'davidafdal7@gmail.com'),  ('GERIN BAGAS LINO JAPAR HADI', '081933174900', 'Pondok Aren', '26-04-2023', 'ACA', 'davidafdal7@gmail.com'),
    ('ABDUL HADI', '081933174900', 'Gelang Damai', '06-09-2023', 'ACA', 'davidafdal7@gmail.com'), ('SRI UTAMI HP', '081933174900', 'Gelang Damai', '07-06-2023', 'ACA', 'davidafdal7@gmail.com');