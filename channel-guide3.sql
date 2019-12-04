PGDMP         4                w            channel-guide    12.1    12.1 /    D           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            E           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            F           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            G           1262    16442    channel-guide    DATABASE     �   CREATE DATABASE "channel-guide" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "channel-guide";
                postgres    false            �            1259    16443    channel_sequence    SEQUENCE     }   CREATE SEQUENCE public.channel_sequence
    START WITH 1000
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.channel_sequence;
       public          postgres    false            �            1259    16445    channels    TABLE     _   CREATE TABLE public.channels (
    name text,
    description text,
    id integer NOT NULL
);
    DROP TABLE public.channels;
       public         heap    postgres    false            �            1259    16451    channels_id_seq    SEQUENCE     �   ALTER TABLE public.channels ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.channels_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    203            �            1259    16453    programs    TABLE     �   CREATE TABLE public.programs (
    name text,
    description text,
    color_code text,
    type text,
    id integer NOT NULL
);
    DROP TABLE public.programs;
       public         heap    postgres    false            �            1259    16459    programs_id_seq    SEQUENCE     �   ALTER TABLE public.programs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.programs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    205            �            1259    16485    record_program    TABLE     a   CREATE TABLE public.record_program (
    program_id integer NOT NULL,
    id integer NOT NULL
);
 "   DROP TABLE public.record_program;
       public         heap    postgres    false            �            1259    16565    record_program_id_seq    SEQUENCE     �   CREATE SEQUENCE public.record_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.record_program_id_seq;
       public          postgres    false    209            H           0    0    record_program_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.record_program_id_seq OWNED BY public.record_program.id;
          public          postgres    false    213            �            1259    16495    record_schedule    TABLE     c   CREATE TABLE public.record_schedule (
    schedule_id integer NOT NULL,
    id integer NOT NULL
);
 #   DROP TABLE public.record_schedule;
       public         heap    postgres    false            �            1259    16552    record_schedule_id_seq    SEQUENCE     �   CREATE SEQUENCE public.record_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.record_schedule_id_seq;
       public          postgres    false    210            I           0    0    record_schedule_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.record_schedule_id_seq OWNED BY public.record_schedule.id;
          public          postgres    false    212            �            1259    16505 	   recording    TABLE     n   CREATE TABLE public.recording (
    status text,
    schedule_id integer NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.recording;
       public         heap    postgres    false            �            1259    16578    recording_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recording_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.recording_id_seq;
       public          postgres    false    211            J           0    0    recording_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.recording_id_seq OWNED BY public.recording.id;
          public          postgres    false    214            �            1259    16461    schedule    TABLE       CREATE TABLE public.schedule (
    shift_minutes integer,
    information jsonb,
    id integer NOT NULL,
    channel_id integer NOT NULL,
    program_id integer NOT NULL,
    start_time timestamp without time zone,
    end_time timestamp without time zone
);
    DROP TABLE public.schedule;
       public         heap    postgres    false            �            1259    16467    schedule_id_seq    SEQUENCE     �   ALTER TABLE public.schedule ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.schedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    207            �
           2604    16567    record_program id    DEFAULT     v   ALTER TABLE ONLY public.record_program ALTER COLUMN id SET DEFAULT nextval('public.record_program_id_seq'::regclass);
 @   ALTER TABLE public.record_program ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    209            �
           2604    16554    record_schedule id    DEFAULT     x   ALTER TABLE ONLY public.record_schedule ALTER COLUMN id SET DEFAULT nextval('public.record_schedule_id_seq'::regclass);
 A   ALTER TABLE public.record_schedule ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    210            �
           2604    16580    recording id    DEFAULT     l   ALTER TABLE ONLY public.recording ALTER COLUMN id SET DEFAULT nextval('public.recording_id_seq'::regclass);
 ;   ALTER TABLE public.recording ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    211            6          0    16445    channels 
   TABLE DATA           9   COPY public.channels (name, description, id) FROM stdin;
    public          postgres    false    203   �3       8          0    16453    programs 
   TABLE DATA           K   COPY public.programs (name, description, color_code, type, id) FROM stdin;
    public          postgres    false    205   �4       <          0    16485    record_program 
   TABLE DATA           8   COPY public.record_program (program_id, id) FROM stdin;
    public          postgres    false    209   %5       =          0    16495    record_schedule 
   TABLE DATA           :   COPY public.record_schedule (schedule_id, id) FROM stdin;
    public          postgres    false    210   F5       >          0    16505 	   recording 
   TABLE DATA           <   COPY public.recording (status, schedule_id, id) FROM stdin;
    public          postgres    false    211   k5       :          0    16461    schedule 
   TABLE DATA           p   COPY public.schedule (shift_minutes, information, id, channel_id, program_id, start_time, end_time) FROM stdin;
    public          postgres    false    207   �5       K           0    0    channel_sequence    SEQUENCE SET     B   SELECT pg_catalog.setval('public.channel_sequence', 1000, false);
          public          postgres    false    202            L           0    0    channels_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.channels_id_seq', 6, true);
          public          postgres    false    204            M           0    0    programs_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.programs_id_seq', 3, true);
          public          postgres    false    206            N           0    0    record_program_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.record_program_id_seq', 1, true);
          public          postgres    false    213            O           0    0    record_schedule_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.record_schedule_id_seq', 3, true);
          public          postgres    false    212            P           0    0    recording_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.recording_id_seq', 4, true);
          public          postgres    false    214            Q           0    0    schedule_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.schedule_id_seq', 8, true);
          public          postgres    false    208            �
           2606    16470    channels id 
   CONSTRAINT     I   ALTER TABLE ONLY public.channels
    ADD CONSTRAINT id PRIMARY KEY (id);
 5   ALTER TABLE ONLY public.channels DROP CONSTRAINT id;
       public            postgres    false    203            �
           2606    16472    programs programs_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.programs DROP CONSTRAINT programs_pkey;
       public            postgres    false    205            �
           2606    16572 "   record_program record_program_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.record_program
    ADD CONSTRAINT record_program_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.record_program DROP CONSTRAINT record_program_pkey;
       public            postgres    false    209            �
           2606    16559 $   record_schedule record_schedule_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.record_schedule
    ADD CONSTRAINT record_schedule_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.record_schedule DROP CONSTRAINT record_schedule_pkey;
       public            postgres    false    210            �
           2606    16588    recording recording_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.recording
    ADD CONSTRAINT recording_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.recording DROP CONSTRAINT recording_pkey;
       public            postgres    false    211            �
           2606    16474    schedule schedule_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.schedule DROP CONSTRAINT schedule_pkey;
       public            postgres    false    207            �
           2606    16475    schedule channel_fk    FK CONSTRAINT     x   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT channel_fk FOREIGN KEY (channel_id) REFERENCES public.channels(id);
 =   ALTER TABLE ONLY public.schedule DROP CONSTRAINT channel_fk;
       public          postgres    false    2727    207    203            �
           2606    16480    schedule program_fk    FK CONSTRAINT     x   ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT program_fk FOREIGN KEY (program_id) REFERENCES public.programs(id);
 =   ALTER TABLE ONLY public.schedule DROP CONSTRAINT program_fk;
       public          postgres    false    207    2729    205            �
           2606    16573 %   record_program record_program_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.record_program
    ADD CONSTRAINT record_program_id_fkey FOREIGN KEY (id) REFERENCES public.programs(id) NOT VALID;
 O   ALTER TABLE ONLY public.record_program DROP CONSTRAINT record_program_id_fkey;
       public          postgres    false    205    209    2729            �
           2606    16560 '   record_schedule record_schedule_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.record_schedule
    ADD CONSTRAINT record_schedule_id_fkey FOREIGN KEY (id) REFERENCES public.schedule(id) NOT VALID;
 Q   ALTER TABLE ONLY public.record_schedule DROP CONSTRAINT record_schedule_id_fkey;
       public          postgres    false    210    2731    207            �
           2606    16589    recording recording_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recording
    ADD CONSTRAINT recording_id_fkey FOREIGN KEY (id) REFERENCES public.schedule(id) NOT VALID;
 E   ALTER TABLE ONLY public.recording DROP CONSTRAINT recording_id_fkey;
       public          postgres    false    211    207    2731            6   �   x�e���0��ۧػ�	�� z2W/Ui(��-�������73����d����G'��IX�Cm-6�o�B?2H�lNc�зr�i�%9C��i����_O2�b4�m&ܒ�:�#��Eo!�!������a�Y�O��&�g>� �6�l�y��� 4�c]      8   ~   x����
�0���W,�.6�<
�=zY��Y�i�F��-��e3�QrV��]���܇'�2�j��P�ߚ'8�%OI-�]��Ѫ5�盪.IȄm��˝�΁�8��jҿ���	D� ��;      <      x�3�4����� f      =      x�3�4��4����� �      >   (   x�+JM�/J��K��4�J���,�HM�4�4����� ���      :   3  x���=o�0�g�'�&��$%�Iԥ4j�.]�ڪ�:�l�
U��5������܉{��6	��R�Z�R��p�Bi���od\pݔ���F��*���./Z�"��ʹ��w�Jp�B�"���wTK�ZH��v	��se=�q�.�ٌ}( �}���*�4��d�Aɼƃ�=�L~[܎-،�j�O�N&2p��D�/���7�͍���Mr0+��8�v�݉C�l!�L栿�c���K�\����^޽�p**S,�Ɓc �~��0��p_��u�sy��K��s<����u�?�}�     