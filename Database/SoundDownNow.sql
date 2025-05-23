PGDMP      '                }            musiq    17.4    17.4 8    b           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            c           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            d           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            e           1262    32811    musiq    DATABASE     k   CREATE DATABASE musiq WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'vi-VN';
    DROP DATABASE musiq;
                     postgres    false            �            1259    32842 	   favorites    TABLE     \   CREATE TABLE public.favorites (
    userid integer NOT NULL,
    songid integer NOT NULL
);
    DROP TABLE public.favorites;
       public         heap r       postgres    false            �            1259    32831 	   playlists    TABLE     x   CREATE TABLE public.playlists (
    playlistid integer NOT NULL,
    name character varying(255),
    userid integer
);
    DROP TABLE public.playlists;
       public         heap r       postgres    false            �            1259    32830    playlists_playlistid_seq    SEQUENCE     �   CREATE SEQUENCE public.playlists_playlistid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.playlists_playlistid_seq;
       public               postgres    false    222            f           0    0    playlists_playlistid_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.playlists_playlistid_seq OWNED BY public.playlists.playlistid;
          public               postgres    false    221            �            1259    32874    playlistsongs    TABLE     d   CREATE TABLE public.playlistsongs (
    playlistid integer NOT NULL,
    songid integer NOT NULL
);
 !   DROP TABLE public.playlistsongs;
       public         heap r       postgres    false            �            1259    41082    roles    TABLE     j   CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL
);
    DROP TABLE public.roles;
       public         heap r       postgres    false            �            1259    41081    roles_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.roles_role_id_seq;
       public               postgres    false    229            g           0    0    roles_role_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;
          public               postgres    false    228            �            1259    32858    songhistory    TABLE     �   CREATE TABLE public.songhistory (
    historyid integer NOT NULL,
    userid integer,
    songid integer,
    playtime timestamp without time zone
);
    DROP TABLE public.songhistory;
       public         heap r       postgres    false            �            1259    32857    songhistory_historyid_seq    SEQUENCE     �   CREATE SEQUENCE public.songhistory_historyid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.songhistory_historyid_seq;
       public               postgres    false    225            h           0    0    songhistory_historyid_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.songhistory_historyid_seq OWNED BY public.songhistory.historyid;
          public               postgres    false    224            �            1259    32822    songs    TABLE     O  CREATE TABLE public.songs (
    songid integer NOT NULL,
    name character varying(255),
    genre character varying(255),
    filename character varying(255),
    description character varying(255),
    image character varying(255),
    views integer DEFAULT 0,
    downloads integer DEFAULT 0,
    approved boolean DEFAULT false
);
    DROP TABLE public.songs;
       public         heap r       postgres    false            �            1259    32821    songs_songid_seq    SEQUENCE     �   CREATE SEQUENCE public.songs_songid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.songs_songid_seq;
       public               postgres    false    220            i           0    0    songs_songid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.songs_songid_seq OWNED BY public.songs.songid;
          public               postgres    false    219            �            1259    32813    users    TABLE     �   CREATE TABLE public.users (
    userid integer NOT NULL,
    name character varying(255),
    password character varying(255),
    image character varying(255),
    role_id integer,
    role character varying(255)
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    32914    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false            �            1259    32812    users_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.users_userid_seq;
       public               postgres    false    218            j           0    0    users_userid_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;
          public               postgres    false    217            �           2604    32834    playlists playlistid    DEFAULT     |   ALTER TABLE ONLY public.playlists ALTER COLUMN playlistid SET DEFAULT nextval('public.playlists_playlistid_seq'::regclass);
 C   ALTER TABLE public.playlists ALTER COLUMN playlistid DROP DEFAULT;
       public               postgres    false    221    222    222            �           2604    41085    roles role_id    DEFAULT     n   ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);
 <   ALTER TABLE public.roles ALTER COLUMN role_id DROP DEFAULT;
       public               postgres    false    228    229    229            �           2604    32861    songhistory historyid    DEFAULT     ~   ALTER TABLE ONLY public.songhistory ALTER COLUMN historyid SET DEFAULT nextval('public.songhistory_historyid_seq'::regclass);
 D   ALTER TABLE public.songhistory ALTER COLUMN historyid DROP DEFAULT;
       public               postgres    false    224    225    225            �           2604    32825    songs songid    DEFAULT     l   ALTER TABLE ONLY public.songs ALTER COLUMN songid SET DEFAULT nextval('public.songs_songid_seq'::regclass);
 ;   ALTER TABLE public.songs ALTER COLUMN songid DROP DEFAULT;
       public               postgres    false    219    220    220            �           2604    32816    users userid    DEFAULT     l   ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);
 ;   ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
       public               postgres    false    217    218    218            Y          0    32842 	   favorites 
   TABLE DATA           3   COPY public.favorites (userid, songid) FROM stdin;
    public               postgres    false    223   �@       X          0    32831 	   playlists 
   TABLE DATA           =   COPY public.playlists (playlistid, name, userid) FROM stdin;
    public               postgres    false    222   A       \          0    32874    playlistsongs 
   TABLE DATA           ;   COPY public.playlistsongs (playlistid, songid) FROM stdin;
    public               postgres    false    226   RA       _          0    41082    roles 
   TABLE DATA           3   COPY public.roles (role_id, role_name) FROM stdin;
    public               postgres    false    229   �A       [          0    32858    songhistory 
   TABLE DATA           J   COPY public.songhistory (historyid, userid, songid, playtime) FROM stdin;
    public               postgres    false    225   �A       V          0    32822    songs 
   TABLE DATA           n   COPY public.songs (songid, name, genre, filename, description, image, views, downloads, approved) FROM stdin;
    public               postgres    false    220   �A       T          0    32813    users 
   TABLE DATA           M   COPY public.users (userid, name, password, image, role_id, role) FROM stdin;
    public               postgres    false    218   iD       k           0    0    playlists_playlistid_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.playlists_playlistid_seq', 14, true);
          public               postgres    false    221            l           0    0    roles_role_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.roles_role_id_seq', 5, true);
          public               postgres    false    228            m           0    0    songhistory_historyid_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.songhistory_historyid_seq', 5, true);
          public               postgres    false    224            n           0    0    songs_songid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.songs_songid_seq', 28, true);
          public               postgres    false    219            o           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public               postgres    false    227            p           0    0    users_userid_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_userid_seq', 10, true);
          public               postgres    false    217            �           2606    32846    favorites favorites_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (userid, songid);
 B   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_pkey;
       public                 postgres    false    223    223            �           2606    32836    playlists playlists_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (playlistid);
 B   ALTER TABLE ONLY public.playlists DROP CONSTRAINT playlists_pkey;
       public                 postgres    false    222            �           2606    32878     playlistsongs playlistsongs_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.playlistsongs
    ADD CONSTRAINT playlistsongs_pkey PRIMARY KEY (playlistid, songid);
 J   ALTER TABLE ONLY public.playlistsongs DROP CONSTRAINT playlistsongs_pkey;
       public                 postgres    false    226    226            �           2606    41087    roles roles_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public                 postgres    false    229            �           2606    32863    songhistory songhistory_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.songhistory
    ADD CONSTRAINT songhistory_pkey PRIMARY KEY (historyid);
 F   ALTER TABLE ONLY public.songhistory DROP CONSTRAINT songhistory_pkey;
       public                 postgres    false    225            �           2606    32829    songs songs_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (songid);
 :   ALTER TABLE ONLY public.songs DROP CONSTRAINT songs_pkey;
       public                 postgres    false    220            �           2606    32820    users users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �           1259    32906    idx_songs_name    INDEX     @   CREATE INDEX idx_songs_name ON public.songs USING btree (name);
 "   DROP INDEX public.idx_songs_name;
       public                 postgres    false    220            �           2606    65807    favorites favorites_songid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_songid_fkey FOREIGN KEY (songid) REFERENCES public.songs(songid) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_songid_fkey;
       public               postgres    false    220    4783    223            �           2606    65822    favorites favorites_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_userid_fkey;
       public               postgres    false    223    4780    218            �           2606    41088    users fk_role    FK CONSTRAINT     q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(role_id);
 7   ALTER TABLE ONLY public.users DROP CONSTRAINT fk_role;
       public               postgres    false    4793    229    218            �           2606    65817    playlists playlists_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.playlists DROP CONSTRAINT playlists_userid_fkey;
       public               postgres    false    4780    222    218            �           2606    57602 +   playlistsongs playlistsongs_playlistid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.playlistsongs
    ADD CONSTRAINT playlistsongs_playlistid_fkey FOREIGN KEY (playlistid) REFERENCES public.playlists(playlistid) ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.playlistsongs DROP CONSTRAINT playlistsongs_playlistid_fkey;
       public               postgres    false    222    226    4785            �           2606    65812 '   playlistsongs playlistsongs_songid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.playlistsongs
    ADD CONSTRAINT playlistsongs_songid_fkey FOREIGN KEY (songid) REFERENCES public.songs(songid) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.playlistsongs DROP CONSTRAINT playlistsongs_songid_fkey;
       public               postgres    false    4783    226    220            �           2606    65802 #   songhistory songhistory_songid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.songhistory
    ADD CONSTRAINT songhistory_songid_fkey FOREIGN KEY (songid) REFERENCES public.songs(songid) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.songhistory DROP CONSTRAINT songhistory_songid_fkey;
       public               postgres    false    4783    225    220            �           2606    32864 #   songhistory songhistory_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.songhistory
    ADD CONSTRAINT songhistory_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);
 M   ALTER TABLE ONLY public.songhistory DROP CONSTRAINT songhistory_userid_fkey;
       public               postgres    false    218    4780    225            Y      x�34�42����� 
H�      X   7   x�3�LLL����44�44����9�`�ge*�aK�3M8|@�=... �fI      \   &   x�34�42�24�42�24�42���	��W� \@�      _   -   x�3�LL����2�,-N-�2���OI-J,�/�2�J�B�b���� Qld      [      x������ � �      V   w  x�mRMo�@</�b� +@[�
�M0%1�"���l�������+%Ǩ��z�ZU��=8��pI�&�ȇ|�����{3[�"{�f��KLK�.�Ŕ�u��]͝VȎ �#��{���~:![ꑹr�Hn��=�u+�i� &%�&�ȧh�d�͹��c�}Ħ^�HXv�d�)\�Ƶ=T�+�N�˔z�$��/9�dueb/C�}�d̩7֦ޝ^�r�0O����n���^�Z�It�/M���R�I�����sbX�gaj%�9\zC<�D �Xxi3���,/H=���\(M�p�$�N�I���}w��3.��Ȅ�8� ��bĥi=S)��D`1L��!34�Hx�u/ɮ�V,#���Hb߫{B��׆�>K�oj����5Fe'�G��ul��N%�ʃ��Й�Tw��WMW�PGy�\Qؖ�0�m�9 ����LC�+�l7>�I����xa�U����n�#F��7ȗ
�kl��sF���H�T��zR���O:��S�3Yd�S�K�˛,�mR�R2?X0e����3��^GLe]�c�'����CC�0�	o��i1h���Ɓ�^���6���ӭ�~�1�Fŗ����7I�/R]�d�C���TS��r����e�      T   L   x�34�,,M�FF�1~ ������Y\R�X�_�e�v�9O�8��R�S�K�R�l���tN#��=... ��t     