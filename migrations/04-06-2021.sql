--
-- PostgreSQL database dump
--

-- Dumped from database version 11.11
-- Dumped by pg_dump version 11.11

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

--
-- Name: enum_Groups_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."enum_Groups_type" AS ENUM (
    'public',
    'private'
);


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Answers" (
    id character varying(255) NOT NULL,
    content text NOT NULL,
    "userId" character varying(255),
    "postId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Files" (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    mimetype character varying(255) NOT NULL,
    uri text NOT NULL,
    "postId" character varying(255)
);


--
-- Name: Groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Groups" (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(255) NOT NULL
);


--
-- Name: PostTags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PostTags" (
    "postId" character varying(255) NOT NULL,
    "tagId" character varying(255) NOT NULL
);


--
-- Name: Posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Posts" (
    id character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    "userId" character varying(255),
    "groupId" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: Tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Tags" (
    id character varying(255) NOT NULL,
    name character varying(35) NOT NULL
);


--
-- Name: UserGroups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserGroups" (
    "userId" character varying(255) NOT NULL,
    "groupId" character varying(255) NOT NULL
);


--
-- Name: Users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Users" (
    id character varying(255) NOT NULL,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    "profilePhoto" text,
    "googleId" character varying(255)
);


--
-- Data for Name: Answers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Answers" (id, content, "userId", "postId", "createdAt", "updatedAt") FROM stdin;
baafd238-89a2-46df-bbf1-e0f4e0ed51ff	Morbi a placerat nulla, at bibendum mi. Aenean tortor dui, finibus eu orci at, pellentesque eleifend ipsum. Fusce quis ex ac nunc aliquet bibendum. Mauris viverra tempus lectus quis consectetur. Maecenas ut velit vel massa faucibus dignissim. Etiam accumsan justo velit, vel maximus nulla porta in. Integer sollicitudin ultricies nulla, sit amet malesuada velit blandit at.	7cbea5e9-b474-4679-9e0a-c135b9809910	c9bd2bba-27ae-4a0a-8409-cb79e4af9446	2021-06-04 22:43:33.063+01	2021-06-04 22:43:33.068+01
e2ea080c-62e6-4f8a-b780-9f145704417a	Fusce ornare nunc et metus aliquam, eu imperdiet arcu fringilla. Nulla aliquet, arcu pellentesque faucibus hendrerit, nunc orci efficitur metus, sit amet ultrices felis enim id est. Phasellus a odio non tellus gravida mattis. In hac habitasse platea dictumst. Nulla consectetur nunc eget scelerisque interdum. Suspendisse potenti. Fusce nec facilisis quam. Ut gravida vehicula egestas. Vestibulum nisl ligula, porttitor sit amet magna sed, convallis mattis augue.	7cbea5e9-b474-4679-9e0a-c135b9809910	aeeb7256-7d67-4a8f-8b3e-183177c092b3	2021-06-04 22:52:53.843+01	2021-06-04 22:52:53.849+01
1a262966-2dff-419c-ab51-b42429121765	Integer vehicula ultricies nunc, id sodales diam cursus eget. Suspendisse potenti. Aenean commodo eu metus sit amet malesuada. Proin ipsum arcu, blandit non ex ut, aliquam luctus mauris. Morbi quis dignissim sapien. Donec eget turpis vitae nibh bibendum venenatis eget ut nisi. Aenean finibus iaculis justo eget placerat. Quisque sit amet tortor libero. Nulla gravida imperdiet turpis, a sodales augue ornare quis. Fusce pellentesque mattis dolor, ut elementum lectus. Aliquam luctus sapien eu metus laoreet, ut bibendum elit aliquet.\n\n	82c40c0c-0058-4558-b512-bf4fe468a250	53071c61-8b91-458b-ba2a-be84c33a1d7d	2021-06-04 22:51:56.606+01	2021-06-04 22:51:56.617+01
fa9f1d63-b2e7-4ffe-8d83-9bbeb881221a	Donec nec mi efficitur, pellentesque quam et, fringilla nibh. Praesent justo nisi, volutpat sed malesuada euismod, faucibus ut augue. Maecenas varius, orci in tristique cursus, orci felis facilisis lacus, ut tempus orci risus quis ipsum. Sed ultrices blandit sodales. Nulla id scelerisque mauris. Pellentesque sit amet laoreet enim. Nam porttitor varius mattis. Sed consequat elit nec orci congue viverra. Fusce mattis condimentum nisi, eget accumsan sem bibendum ac. Aenean auctor quam elit, sit amet congue erat fringilla et. Sed placerat tincidunt lectus sed rutrum.	7cbea5e9-b474-4679-9e0a-c135b9809910	53071c61-8b91-458b-ba2a-be84c33a1d7d	2021-06-04 22:52:05.584+01	2021-06-04 22:52:05.596+01
da4ce982-74bb-44a6-b081-28cc85969a9d	Etiam a tortor et ante efficitur vehicula sed a purus. Fusce auctor elit non pulvinar auctor. Cras congue tortor quis cursus lacinia. Vestibulum tincidunt mauris dui, et pulvinar nunc lobortis et. Cras ultricies nibh ut volutpat accumsan. Vivamus quis nulla massa. Nam odio dolor, ultricies et odio vel, varius condimentum turpis. Ut efficitur est non euismod tincidunt.\n\nPellentesque id bibendum nulla. Sed tempus ante a mauris condimentum feugiat. Donec pellentesque dui nec lacus feugiat dapibus. Proin at ante a ligula scelerisque accumsan. Sed pellentesque eros id odio varius, nec ultrices neque ultricies. Praesent tincidunt lectus sed quam tincidunt elementum. Maecenas eget massa in nunc fringilla ornare ac vitae urna. Nulla mattis urna in augue malesuada egestas.\n\n	82c40c0c-0058-4558-b512-bf4fe468a250	af1376bd-41bb-4764-a66d-5a4a692e6981	2021-06-04 22:59:23.26+01	2021-06-04 22:59:23.274+01
6c2a1c49-11c6-4e19-a917-197707c7493e	In condimentum ultrices tortor id eleifend. Proin rhoncus elementum augue sed faucibus. Vivamus bibendum tincidunt leo sit amet luctus. Quisque laoreet enim et lacus lacinia convallis.	7cbea5e9-b474-4679-9e0a-c135b9809910	4e811dcd-3755-4ad2-882f-e5950977b665	2021-06-04 22:52:28.331+01	2021-06-04 22:52:28.337+01
185f46e3-cda3-4798-955d-37ab007be733	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis ipsum urna, non congue magna euismod vitae. Suspendisse at nibh fringilla, aliquam risus eget, malesuada urna. In ut sem pharetra, auctor dolor in, lacinia massa. Curabitur ultrices metus eget diam aliquet gravida. Curabitur mollis, orci ac fermentum commodo, enim libero mollis mi, ut finibus purus mauris et dolor. Proin a dictum risus. Praesent fringilla nunc eu tortor ornare fringilla.	7cbea5e9-b474-4679-9e0a-c135b9809910	aeeb7256-7d67-4a8f-8b3e-183177c092b3	2021-06-04 22:52:58.138+01	2021-06-04 22:52:58.146+01
88338e5e-6417-4227-a96d-0be3bb704af7	Praesent eu dolor erat. Fusce vitae tincidunt libero, vel rutrum diam. 	7cbea5e9-b474-4679-9e0a-c135b9809910	1ac54f94-052f-4270-8a08-91a689284937	2021-06-04 22:52:44.542+01	2021-06-04 22:52:44.549+01
1a2081c9-2d1e-42d1-b383-0b5b61a1588c	In condimentum ultrices tortor id eleifend. Proin rhoncus elementum augue sed faucibus.	7cbea5e9-b474-4679-9e0a-c135b9809910	02ff5587-e72a-4cb8-92cf-48f17eb09b82	2021-06-04 22:54:00.42+01	2021-06-04 22:54:00.428+01
27f01836-3f5b-4565-b3f6-9410edb8b9ed	Vestibulum elementum mi neque, eget maximus dui ultricies non.	82c40c0c-0058-4558-b512-bf4fe468a250	af1376bd-41bb-4764-a66d-5a4a692e6981	2021-06-04 22:59:31.863+01	2021-06-04 22:59:31.874+01
f92ae1e1-0ffb-4461-a994-97d9787ad17d	Pellentesque id bibendum nulla. Sed tempus ante a mauris condimentum feugiat. Donec pellentesque dui nec lacus feugiat dapibus. Proin at ante a ligula scelerisque accumsan.	7cbea5e9-b474-4679-9e0a-c135b9809910	9db94127-a024-4342-9b59-c945dc111681	2021-06-04 23:01:55.565+01	2021-06-04 23:01:55.577+01
bf468bc1-dcbb-42c1-aa22-45dd544ec15a	Cras porttitor cursus vestibulum. Nunc rutrum sollicitudin mattis. Suspendisse blandit eros non erat fermentum, mattis fermentum velit dignissim. Integer eget mi lectus. Aenean et bibendum ex. Quisque egestas vitae mi luctus vulputate. Nam suscipit at ante ut ullamcorper. In sollicitudin metus non lacus tincidunt, ut fringilla urna condimentum.	7cbea5e9-b474-4679-9e0a-c135b9809910	64f41453-dd67-498a-be85-6fb3d8d3154c	2021-06-04 23:05:52.447+01	2021-06-04 23:05:52.453+01
82907f04-0973-491a-b017-2c79a1043a9f	Quisque et mattis metus. Pellentesque viverra vitae leo at interdum. Fusce sagittis metus sed ligula tincidunt, nec cursus ligula facilisis. Maecenas quis mollis tellus. Sed tempor diam in maximus placerat. Fusce enim nulla, porttitor nec elementum sed, ultricies sit amet metus. Nullam placerat nulla diam, ac semper nunc viverra ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque nec augue ipsum.	82c40c0c-0058-4558-b512-bf4fe468a250	8e852120-7006-421c-9167-cbbc49d53b3a	2021-06-04 23:07:37.547+01	2021-06-04 23:07:37.56+01
66e4fe37-8555-4a48-aeb0-074507b1eb65	Integer vehicula ultricies nunc, id sodales diam cursus eget.	82c40c0c-0058-4558-b512-bf4fe468a250	8e852120-7006-421c-9167-cbbc49d53b3a	2021-06-04 23:07:42.2+01	2021-06-04 23:07:42.211+01
11fdf1b5-3d50-4fe4-8420-96365ef8d90a	Tincidunt vulputate dolor lobortis. Etiam eu augue ut est imperdiet convallis tincidunt a metus.	7cbea5e9-b474-4679-9e0a-c135b9809910	8e852120-7006-421c-9167-cbbc49d53b3a	2021-06-04 23:07:54.934+01	2021-06-04 23:07:54.947+01
4f508991-6582-45e0-a051-927c94aff0a6	Fusce ornare nunc et metus aliquam, eu imperdiet arcu fringilla. Nulla aliquet, arcu pellentesque faucibus hendrerit, nunc orci efficitur metus, sit amet ultrices felis enim id est. Phasellus a odio non tellus gravida mattis. In hac habitasse platea dictumst. Nulla consectetur nunc eget scelerisque interdum. Suspendisse potenti. Fusce nec facilisis quam. Ut gravida vehicula egestas. Vestibulum nisl ligula, porttitor sit amet magna sed, convallis mattis augue.\n\nNullam a dignissim magna. Donec laoreet ipsum ac elit tincidunt, sed consequat neque porta. Mauris maximus orci nisi, et condimentum mi varius eu. Quisque sed facilisis est. In hac habitasse platea dictumst. Nulla at ultricies mi. Suspendisse congue finibus sollicitudin. Vestibulum sit amet pulvinar nunc. Donec pretium ornare risus non lobortis. Curabitur eleifend tortor fringilla est congue, nec vestibulum velit tincidunt. Pellentesque pellentesque quam eu pellentesque varius.	82c40c0c-0058-4558-b512-bf4fe468a250	5ed7bfeb-8c3f-44ce-a1c1-b592d5339512	2021-06-04 23:09:44.88+01	2021-06-04 23:09:44.893+01
f5c31031-af49-4a4c-8a33-08bfafc1c7c7	Sed et venenatis nulla, ut ultrices turpis. Proin et velit aliquam, posuere odio vitae, commodo enim. Donec sollicitudin sapien a urna congue, eu vestibulum dui aliquam. Ut id libero ac erat consequat convallis. Vivamus laoreet at est eu fermentum. Ut consectetur libero a justo condimentum, sit amet ultricies augue dapibus. Sed tristique suscipit fringilla. Aenean vitae lorem id ipsum pharetra facilisis.	82c40c0c-0058-4558-b512-bf4fe468a250	f860d040-d376-4186-9829-3a8a0eb16b6b	2021-06-04 23:13:27.594+01	2021-06-04 23:13:27.606+01
\.


--
-- Data for Name: Files; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Files" (id, name, mimetype, uri, "postId") FROM stdin;
8afcf3cf-4f62-4c58-a762-38c42bbd1bfa	Software-Architecture-Patterns.pdf	application/pdf	uploads/82c40c0c-0058-4558-b512-bf4fe468a250/4ce6b132-f391-4d05-9923-599ada35344c.pdf	9db94127-a024-4342-9b59-c945dc111681
a82f7d84-dfa7-418d-a333-a4340778287f	mock.png	image/png	uploads/82c40c0c-0058-4558-b512-bf4fe468a250/59062d4e-7ab0-4b3e-b068-1e18076b7407.png	64f41453-dd67-498a-be85-6fb3d8d3154c
cd0bd1e7-2704-4a5a-b808-5c1a4de935c6	raspberry.jpeg	image/jpeg	uploads/7cbea5e9-b474-4679-9e0a-c135b9809910/9131ca7c-b48d-40ee-817f-46ada1b3b496.jpeg	8e852120-7006-421c-9167-cbbc49d53b3a
b1c2b610-fa32-43ee-8d48-d5b829c6db8b	mock.png	image/png	uploads/7cbea5e9-b474-4679-9e0a-c135b9809910/f52510da-e1dd-48b8-8251-ca99b856ff16.png	5ed7bfeb-8c3f-44ce-a1c1-b592d5339512
4bbf323a-d394-4508-9e80-a95e17aa4fcc	Software-Architecture-Patterns.pdf	application/pdf	uploads/7cbea5e9-b474-4679-9e0a-c135b9809910/ec821205-cbeb-4b3d-aef9-7c17c5f66f89.pdf	5ed7bfeb-8c3f-44ce-a1c1-b592d5339512
d8a484d8-5cc4-484e-939f-0b29efd78b75	mock.png	image/png	uploads/7cbea5e9-b474-4679-9e0a-c135b9809910/20e2c442-80eb-4d6b-89b8-744ee1f84bf6.png	f860d040-d376-4186-9829-3a8a0eb16b6b
\.


--
-- Data for Name: Groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Groups" (id, name, type) FROM stdin;
dc0b4636-a567-4a32-9e3d-4fb64d919292	Portsoc	public
13aa3713-45c4-401a-abd7-2213ba91e1a6	Appeng	private
\.


--
-- Data for Name: PostTags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PostTags" ("postId", "tagId") FROM stdin;
c9bd2bba-27ae-4a0a-8409-cb79e4af9446	7aa690b0-bc11-408b-a5cf-38049940cc8a
c9bd2bba-27ae-4a0a-8409-cb79e4af9446	e195ccb8-f935-42a2-b00b-9fd6b08bfe34
c9bd2bba-27ae-4a0a-8409-cb79e4af9446	78727b8a-b347-475c-a37b-c03275512931
defb78d0-8abf-40a0-8110-0a8bd97a5cfc	0fbd8671-5eb9-4535-9b26-800cc0d110db
defb78d0-8abf-40a0-8110-0a8bd97a5cfc	741cbfc9-1db5-40c2-8721-34763065ce0e
ed6245a2-21e5-45bc-bb60-5bdce5f3ea97	7aa690b0-bc11-408b-a5cf-38049940cc8a
5378d0f6-1ab5-4ada-b918-85564f6b4859	7aa690b0-bc11-408b-a5cf-38049940cc8a
5378d0f6-1ab5-4ada-b918-85564f6b4859	78727b8a-b347-475c-a37b-c03275512931
aeeb7256-7d67-4a8f-8b3e-183177c092b3	78727b8a-b347-475c-a37b-c03275512931
1ac54f94-052f-4270-8a08-91a689284937	7aa690b0-bc11-408b-a5cf-38049940cc8a
9a9b72fc-4bb0-49e9-baeb-b953d4386913	7aa690b0-bc11-408b-a5cf-38049940cc8a
5b123063-cc40-479a-add1-342ca14fcc93	78727b8a-b347-475c-a37b-c03275512931
5b123063-cc40-479a-add1-342ca14fcc93	0fbd8671-5eb9-4535-9b26-800cc0d110db
5b123063-cc40-479a-add1-342ca14fcc93	e195ccb8-f935-42a2-b00b-9fd6b08bfe34
ac8e4fc0-3cdd-4287-a5ad-c3640e7f9341	7aa690b0-bc11-408b-a5cf-38049940cc8a
ac8e4fc0-3cdd-4287-a5ad-c3640e7f9341	e195ccb8-f935-42a2-b00b-9fd6b08bfe34
ac8e4fc0-3cdd-4287-a5ad-c3640e7f9341	78727b8a-b347-475c-a37b-c03275512931
ac8e4fc0-3cdd-4287-a5ad-c3640e7f9341	0fbd8671-5eb9-4535-9b26-800cc0d110db
02ff5587-e72a-4cb8-92cf-48f17eb09b82	e195ccb8-f935-42a2-b00b-9fd6b08bfe34
fe132e4d-1700-428c-a213-cc608e8bbac6	e195ccb8-f935-42a2-b00b-9fd6b08bfe34
e27eb674-6235-4fc4-93c1-b28eb5593bf6	7aa690b0-bc11-408b-a5cf-38049940cc8a
e27eb674-6235-4fc4-93c1-b28eb5593bf6	e195ccb8-f935-42a2-b00b-9fd6b08bfe34
af1376bd-41bb-4764-a66d-5a4a692e6981	7aa690b0-bc11-408b-a5cf-38049940cc8a
9db94127-a024-4342-9b59-c945dc111681	7aa690b0-bc11-408b-a5cf-38049940cc8a
64f41453-dd67-498a-be85-6fb3d8d3154c	7aa690b0-bc11-408b-a5cf-38049940cc8a
8e852120-7006-421c-9167-cbbc49d53b3a	7aa690b0-bc11-408b-a5cf-38049940cc8a
8e852120-7006-421c-9167-cbbc49d53b3a	e195ccb8-f935-42a2-b00b-9fd6b08bfe34
5ed7bfeb-8c3f-44ce-a1c1-b592d5339512	7aa690b0-bc11-408b-a5cf-38049940cc8a
5ed7bfeb-8c3f-44ce-a1c1-b592d5339512	e195ccb8-f935-42a2-b00b-9fd6b08bfe34
5ed7bfeb-8c3f-44ce-a1c1-b592d5339512	78727b8a-b347-475c-a37b-c03275512931
5ed7bfeb-8c3f-44ce-a1c1-b592d5339512	0fbd8671-5eb9-4535-9b26-800cc0d110db
5ed7bfeb-8c3f-44ce-a1c1-b592d5339512	741cbfc9-1db5-40c2-8721-34763065ce0e
\.


--
-- Data for Name: Posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Posts" (id, title, content, "userId", "groupId", "createdAt", "updatedAt") FROM stdin;
c9bd2bba-27ae-4a0a-8409-cb79e4af9446	Nullam a dignissim magna. Donec laoreet ipsum ac elit tincidunt, sed consequat neque porta.	Etiam a tortor et ante efficitur vehicula sed a purus. Fusce auctor elit non pulvinar auctor. Cras congue tortor quis cursus lacinia. Vestibulum tincidunt mauris dui, et pulvinar nunc lobortis et. Cras ultricies nibh ut volutpat accumsan. Vivamus quis nulla massa. Nam odio dolor, ultricies et odio vel, varius condimentum turpis. Ut efficitur est non euismod tincidunt.\r\n\r\nPellentesque id bibendum nulla. Sed tempus ante a mauris condimentum feugiat. Donec pellentesque dui nec lacus feugiat dapibus. Proin at ante a ligula scelerisque accumsan. Sed pellentesque eros id odio varius, nec ultrices neque ultricies. Praesent tincidunt lectus sed quam tincidunt elementum. Maecenas eget massa in nunc fringilla ornare ac vitae urna. Nulla mattis urna in augue malesuada egestas.\r\n\r\nVestibulum elementum mi neque, eget maximus dui ultricies non. Cras nec placerat libero, sed dictum metus. Etiam convallis volutpat est, et hendrerit sem placerat vel. Praesent ultrices mauris eget ultrices euismod. Aliquam consequat odio et lacus commodo, quis sodales dolor varius. Cras quis ligula in libero mollis tristique a non nisl. Aliquam ligula mi, fermentum nec orci a, egestas semper enim. In sem magna, ultrices eu mollis at, aliquam quis enim. In non ipsum in turpis viverra faucibus. Duis et ipsum sem. Nullam eget tortor nec dolor fringilla consectetur eu at ante. Aenean quis nulla ac sapien aliquet rhoncus.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:43:25.169+01	2021-06-04 22:43:25.181+01
defb78d0-8abf-40a0-8110-0a8bd97a5cfc	Duis volutpat vitae tellus a pretium. Praesent magna nisl, finibus nec justo nec.	Mauris lacinia felis at eros venenatis vulputate. Praesent placerat volutpat mauris, posuere porttitor erat bibendum vitae. In ac fermentum nulla. Nullam vestibulum arcu sit amet pellentesque convallis. Integer tincidunt dui in accumsan congue. In euismod turpis sit amet risus ornare, eget tempor elit rhoncus. Morbi lectus nisi, interdum eu nulla nec, auctor pellentesque magna. Sed maximus augue nibh, ac pellentesque ante egestas non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum porttitor varius lorem nec pulvinar. Aliquam quam ante, luctus sed ipsum in, euismod imperdiet libero. Phasellus mollis risus ac consectetur ultrices. Suspendisse tincidunt vulputate fringilla. In at efficitur nulla, ut dictum massa. Cras volutpat magna eros, ac varius metus luctus vitae. Nulla massa libero, volutpat id turpis ut, porttitor ultrices ex.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:44:01.568+01	2021-06-04 22:44:01.573+01
ed6245a2-21e5-45bc-bb60-5bdce5f3ea97	Nunc nisl dui, egestas non mi eu, placerat condimentum risus.	Duis volutpat vitae tellus a pretium. Praesent magna nisl, finibus nec justo nec, condimentum faucibus dui. Praesent tempor auctor eros, et facilisis nunc aliquet vitae. Praesent nec bibendum massa, finibus auctor nisl. Sed volutpat, orci ac placerat finibus, magna lacus tempor lacus, vel commodo nulla dolor sit amet dui. Mauris tristique eros sit amet nibh accumsan ullamcorper. Etiam eleifend arcu sit amet tellus efficitur, aliquet scelerisque felis sagittis. Sed lectus dui, porttitor at ipsum at, vehicula feugiat neque. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:44:14.907+01	2021-06-04 22:44:14.911+01
81df17b6-ca00-42a8-bab2-96c860b4326d	Phasellus metus augue, pretium nec neque non.	Phasellus metus augue, pretium nec neque non, placerat tincidunt mi. Mauris tincidunt augue eu nibh faucibus vulputate. Morbi malesuada nibh diam, vitae tristique sapien luctus sit amet. Sed malesuada enim sit amet ipsum placerat viverra. Nam eu magna congue nisl laoreet scelerisque congue eu nulla. Maecenas nunc justo, tincidunt at justo non, viverra hendrerit ex. Aenean ac accumsan ipsum. Pellentesque elit ipsum, efficitur nec lorem quis, interdum tempor diam.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:44:31.193+01	2021-06-04 22:44:31.196+01
5378d0f6-1ab5-4ada-b918-85564f6b4859	Integer vitae risus finibus, vehicula metus sit amet.	Proin vel posuere eros. Fusce eu justo quam. Cras a mi porttitor, pretium eros a, dignissim mauris. Nullam id quam vitae nisi interdum maximus. Donec orci magna, commodo eget ex a, ornare euismod lectus. Etiam euismod ullamcorper neque ac accumsan. Nullam in mauris sit amet neque lacinia aliquet.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:44:55.993+01	2021-06-04 22:44:55.997+01
aeeb7256-7d67-4a8f-8b3e-183177c092b3	Morbi sodales posuere interdum.	Nulla malesuada, odio vitae consectetur ornare, tellus mi tristique felis, vitae accumsan augue massa vel nisl. Fusce elementum nisi sit amet purus laoreet, vitae aliquam lorem imperdiet. Ut porttitor arcu nulla, nec tristique ante ullamcorper ac. Proin aliquam maximus tincidunt. Sed efficitur faucibus nunc at rhoncus. Ut feugiat justo at eros viverra tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat sodales arcu vel gravida. Aliquam finibus sollicitudin est id placerat. Vestibulum interdum nulla vitae euismod varius.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:45:35.053+01	2021-06-04 22:45:35.057+01
1ac54f94-052f-4270-8a08-91a689284937	Suspendisse eu fringilla nisi. Suspendisse sollicitudin mi sit amet metus varius imperdiet. Maecenas semper, risus ut gravida commodo.	Nunc nisl dui, egestas non mi eu, placerat condimentum risus. Donec aliquam nibh felis, a dapibus sapien varius vel. In sed malesuada elit. Morbi eu est sem. Sed sed accumsan magna, sit amet laoreet sapien. Mauris at posuere leo, in iaculis orci. Maecenas eu nibh at nisl tincidunt ullamcorper. Nam sed turpis iaculis ipsum posuere finibus sodales a lacus. Nullam in massa quis ex dictum interdum ac eget mauris. Proin eu iaculis mauris. Nunc vulputate urna sit amet ex lacinia, at bibendum lorem efficitur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras fermentum pretium lacus, eu aliquam ex imperdiet sit amet. Fusce tincidunt feugiat velit sit amet tristique. Quisque varius sem vel orci vehicula, nec mollis leo vulputate. Phasellus suscipit, diam ac efficitur cursus, quam nulla rhoncus metus, quis sagittis neque nunc sagittis mi.\r\n\r\nPhasellus metus augue, pretium nec neque non, placerat tincidunt mi. Mauris tincidunt augue eu nibh faucibus vulputate. Morbi malesuada nibh diam, vitae tristique sapien luctus sit amet. Sed malesuada enim sit amet ipsum placerat viverra. Nam eu magna congue nisl laoreet scelerisque congue eu nulla. Maecenas nunc justo, tincidunt at justo non, viverra hendrerit ex. Aenean ac accumsan ipsum. Pellentesque elit ipsum, efficitur nec lorem quis, interdum tempor diam.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:45:55.581+01	2021-06-04 22:45:55.587+01
9a9b72fc-4bb0-49e9-baeb-b953d4386913	Praesent turpis orci, pretium dapibus dui ac, consectetur.	Quisque accumsan ipsum in metus eleifend, quis condimentum lacus feugiat. Etiam viverra ipsum a sem porta, sed porta lorem gravida. Donec dictum consequat nunc id sodales. Fusce leo neque, iaculis sed purus id, porta feugiat sapien. Nunc porttitor dolor vel turpis aliquet, non egestas ligula egestas. Nulla facilisi. Duis elementum erat vitae eros hendrerit, eu placerat augue lacinia. Phasellus vitae nulla at enim bibendum elementum. Nullam gravida odio eget lacinia congue. Suspendisse porttitor ipsum sit amet arcu pretium facilisis. Nam ipsum erat, facilisis vel felis at, fringilla finibus augue. Ut eu est eu mauris interdum interdum. Mauris lorem nunc, mattis in iaculis et, finibus sit amet metus. Duis augue neque, mollis non volutpat vitae, tincidunt id enim.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:46:24.354+01	2021-06-04 22:46:24.358+01
b8138fb6-1de0-418d-a655-79a48aa4edaf	Quisque lobortis pellentesque velit.	Cras porttitor cursus vestibulum. Nunc rutrum sollicitudin mattis. Suspendisse blandit eros non erat fermentum, mattis fermentum velit dignissim. Integer eget mi lectus. Aenean et bibendum ex. Quisque egestas vitae mi luctus vulputate. Nam suscipit at ante ut ullamcorper. In sollicitudin metus non lacus tincidunt, ut fringilla urna condimentum.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:46:41.104+01	2021-06-04 22:46:41.108+01
5b123063-cc40-479a-add1-342ca14fcc93	Ut venenatis sit amet eros aliquam cursus.	Donec consequat finibus felis, at fringilla mauris consequat cursus. Phasellus sed elit rutrum, mattis risus in, bibendum elit. Aenean sed ante aliquam, gravida odio nec, tincidunt purus. Integer tempus nibh eu ex auctor, tincidunt vulputate dolor lobortis. Etiam eu augue ut est imperdiet convallis tincidunt a metus. Curabitur tristique massa in dictum dignissim. Vestibulum imperdiet sollicitudin libero, a luctus metus vestibulum a. Donec rutrum scelerisque velit. Maecenas consequat ac mi vitae molestie. Cras et neque quis neque aliquet dictum auctor ac velit.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:47:13.432+01	2021-06-04 22:47:13.437+01
4e811dcd-3755-4ad2-882f-e5950977b665	Cras porttitor cursus vestibulum.	Quisque accumsan ipsum in metus eleifend, quis condimentum lacus feugiat. Etiam viverra ipsum a sem porta, sed porta lorem gravida. Donec dictum consequat nunc id sodales. Fusce leo neque, iaculis sed purus id, porta feugiat sapien. Nunc porttitor dolor vel turpis aliquet, non egestas ligula egestas. Nulla facilisi. Duis elementum erat vitae eros hendrerit, eu placerat augue lacinia. Phasellus vitae nulla at enim bibendum elementum. Nullam gravida odio eget lacinia congue. Suspendisse porttitor ipsum sit amet arcu pretium facilisis. Nam ipsum erat, facilisis vel felis at, fringilla finibus augue. Ut eu est eu mauris interdum interdum. Mauris lorem nunc, mattis in iaculis et, finibus sit amet metus. Duis augue neque, mollis non volutpat vitae, tincidunt id enim.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:47:30.952+01	2021-06-04 22:47:30.956+01
2c616d8c-c746-4a89-83ec-a8ee93d2b7d0	Lorem ipsum dolor sit amet.	Donec nec mi efficitur, pellentesque quam et, fringilla nibh. Praesent justo nisi, volutpat sed malesuada euismod, faucibus ut augue. Maecenas varius, orci in tristique cursus, orci felis facilisis lacus, ut tempus orci risus quis ipsum. Sed ultrices blandit sodales. Nulla id scelerisque mauris. Pellentesque sit amet laoreet enim. Nam porttitor varius mattis. Sed consequat elit nec orci congue viverra. Fusce mattis condimentum nisi, eget accumsan sem bibendum ac. Aenean auctor quam elit, sit amet congue erat fringilla et. Sed placerat tincidunt lectus sed rutrum.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:47:47.249+01	2021-06-04 22:47:47.254+01
53071c61-8b91-458b-ba2a-be84c33a1d7d	Donec consequat finibus felis	Quisque et mattis metus. Pellentesque viverra vitae leo at interdum. Fusce sagittis metus sed ligula tincidunt, nec cursus ligula facilisis. Maecenas quis mollis tellus. Sed tempor diam in maximus placerat. Fusce enim nulla, porttitor nec elementum sed, ultricies sit amet metus. Nullam placerat nulla diam, ac semper nunc viverra ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque nec augue ipsum.\r\n\r\nEtiam elementum felis et metus elementum, vitae aliquet nulla posuere. Proin molestie blandit odio nec scelerisque. Pellentesque lacinia in mauris consequat iaculis. Nunc iaculis molestie tortor, ac fermentum nibh facilisis vitae. Ut iaculis bibendum fringilla. Quisque id lorem ac quam vehicula ornare. Fusce ut est libero. Praesent eleifend arcu ut nisl pharetra semper.\r\n\r\nEtiam vitae nisl fringilla, cursus enim in, interdum lectus. Quisque leo ipsum, posuere ut tellus sit amet, pretium laoreet nibh. Integer sagittis sollicitudin massa. Ut felis ipsum, placerat vel elit eu, sodales iaculis lacus. Pellentesque ex ligula, condimentum in suscipit eu, sagittis eu metus. Quisque faucibus massa aliquam ante cursus, nec accumsan velit porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent vitae metus feugiat, hendrerit nisl ac, mollis dolor. Suspendisse potenti. Fusce nunc enim, gravida fermentum ante in, ultricies scelerisque metus. Maecenas suscipit, odio non ultrices elementum, sapien leo fermentum nisl, et pharetra tellus sem ac mi. Quisque congue sapien a nisl vehicula, a tincidunt quam pharetra.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:51:43.585+01	2021-06-04 22:51:43.594+01
ac8e4fc0-3cdd-4287-a5ad-c3640e7f9341	Ut pellentesque lobortis dui	Donec nec mi efficitur, pellentesque quam et, fringilla nibh. Praesent justo nisi, volutpat sed malesuada euismod, faucibus ut augue. Maecenas varius, orci in tristique cursus.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:53:29.646+01	2021-06-04 22:53:29.651+01
02ff5587-e72a-4cb8-92cf-48f17eb09b82	Fusce ornare nunc et metus aliquam, eu imperdiet arcu fringilla.	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis ipsum urna, non congue magna euismod vitae. Suspendisse at nibh fringilla, aliquam risus eget, malesuada urna. In ut sem pharetra, auctor dolor in, lacinia massa. Curabitur ultrices metus eget diam aliquet gravida. Curabitur mollis, orci ac fermentum commodo, enim libero mollis mi, ut finibus purus mauris et dolor. Proin a dictum risus. Praesent fringilla nunc eu tortor ornare fringilla.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:53:50.706+01	2021-06-04 22:53:50.716+01
fe132e4d-1700-428c-a213-cc608e8bbac6	Aenean auctor quam elit, sit amet congue erat fringilla et.	Nullam a dignissim magna. Donec laoreet ipsum ac elit tincidunt, sed consequat neque porta. Mauris maximus orci nisi, et condimentum mi varius eu. Quisque sed facilisis est. In hac habitasse platea dictumst. Nulla at ultricies mi. Suspendisse congue finibus sollicitudin. Vestibulum sit amet pulvinar nunc. Donec pretium ornare risus non lobortis. Curabitur eleifend tortor fringilla est congue, nec vestibulum velit tincidunt. Pellentesque pellentesque quam eu pellentesque varius.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 22:54:24.379+01	2021-06-04 22:54:24.382+01
e27eb674-6235-4fc4-93c1-b28eb5593bf6	 Praesent ut arcu facilisis, sollicitudin felis et, suscipit dolor.	Fusce ornare nunc et metus aliquam, eu imperdiet arcu fringilla. Nulla aliquet, arcu pellentesque faucibus hendrerit, nunc orci efficitur metus, sit amet ultrices felis enim id est. Phasellus a odio non tellus gravida mattis. In hac habitasse platea dictumst. Nulla consectetur nunc eget scelerisque interdum. Suspendisse potenti. Fusce nec facilisis quam. Ut gravida vehicula egestas. Vestibulum nisl ligula, porttitor sit amet magna sed, convallis mattis augue.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:55:04.677+01	2021-06-04 22:55:04.686+01
af1376bd-41bb-4764-a66d-5a4a692e6981	Sed pellentesque eros	Etiam a tortor et ante efficitur vehicula sed a purus. Fusce auctor elit non pulvinar auctor. Cras congue tortor quis cursus lacinia. Vestibulum tincidunt mauris dui, et pulvinar nunc lobortis et. Cras ultricies nibh ut volutpat accumsan. Vivamus quis nulla massa. Nam odio dolor, ultricies et odio vel, varius condimentum turpis. Ut efficitur est non euismod tincidunt.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 22:55:18.138+01	2021-06-04 22:55:18.142+01
868199c7-fd69-404e-9adf-41603768d605	Etiam a tortor et ante efficitur vehicula sed a purus. 	Nullam a dignissim magna. Donec laoreet ipsum ac elit tincidunt, sed consequat neque porta. Mauris maximus orci nisi, et condimentum mi varius eu. Quisque sed facilisis est. In hac habitasse platea dictumst. Nulla at ultricies mi. Suspendisse congue finibus sollicitudin. Vestibulum sit amet pulvinar nunc. Donec pretium ornare risus non lobortis. Curabitur eleifend tortor fringilla est congue, nec vestibulum velit tincidunt. Pellentesque pellentesque quam eu pellentesque varius https://www.port.ac.uk/.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 23:00:23.021+01	2021-06-04 23:00:23.031+01
c69b8a3b-e809-44c6-bbba-293a6dbcbfed	Etiam a tortor et ante efficitur vehicula sed a purus.	Fusce auctor elit non pulvinar auctor https://www.port.ac.uk/ cras congue tortor quis cursus lacinia.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 23:00:57.119+01	2021-06-04 23:00:57.13+01
9db94127-a024-4342-9b59-c945dc111681	Nullam a dignissim magna.	Etiam a tortor et ante efficitur vehicula sed a purus. Fusce auctor elit non pulvinar auctor. Cras congue tortor quis cursus lacinia. Vestibulum tincidunt mauris dui, et pulvinar nunc lobortis et. Cras ultricies nibh ut volutpat accumsan. Vivamus quis nulla massa. Nam odio dolor, ultricies et odio vel, varius condimentum turpis. Ut efficitur est non euismod tincidunt.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 23:01:41.809+01	2021-06-04 23:01:41.814+01
64f41453-dd67-498a-be85-6fb3d8d3154c	Etiam a tortor et ante efficitur vehicula sed a purus.	Pellentesque id bibendum nulla. Sed tempus ante a mauris condimentum feugiat. Donec pellentesque dui nec lacus feugiat dapibus. Proin at ante a ligula scelerisque accumsan. Sed pellentesque eros id odio varius, nec ultrices neque ultricies. Praesent tincidunt lectus sed quam tincidunt elementum. Maecenas eget massa in nunc fringilla ornare ac vitae urna. Nulla mattis urna in augue malesuada egestas.	82c40c0c-0058-4558-b512-bf4fe468a250	\N	2021-06-04 23:05:33.612+01	2021-06-04 23:05:33.625+01
8e852120-7006-421c-9167-cbbc49d53b3a	Quisque sit amet tortor libero.	Phasellus sed elit rutrum, mattis risus in, bibendum elit. Aenean sed ante aliquam, gravida odio nec, tincidunt purus. Integer tempus nibh eu ex auctor.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 23:07:26.365+01	2021-06-04 23:07:26.37+01
5ed7bfeb-8c3f-44ce-a1c1-b592d5339512	Nunc at ligula ut urna volutpat sagittis.	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse facilisis ipsum urna, non congue magna euismod vitae. Suspendisse at nibh fringilla, aliquam risus eget, malesuada urna. In ut sem pharetra, auctor dolor in, lacinia massa. Curabitur ultrices metus eget diam aliquet gravida. Curabitur mollis, orci ac fermentum commodo, enim libero mollis mi, ut finibus purus mauris et dolor. Proin a dictum risus. Praesent fringilla nunc eu tortor ornare fringilla.\r\n\r\nPraesent eu dolor erat. Fusce vitae tincidunt libero, vel rutrum diam. Quisque a vestibulum tortor, ac dictum ipsum. Phasellus at bibendum mauris. Integer vel vehicula nulla. Integer a varius nunc, at ultricies magna. Duis nec tempor turpis. Morbi molestie mollis justo eget facilisis. Aliquam tincidunt blandit massa quis pellentesque. Nunc at ligula ut urna volutpat sagittis. Praesent felis nulla, convallis sed turpis ac, vulputate pharetra purus. Fusce ex quam, laoreet ut lacinia et, condimentum nec nibh. Cras commodo elit id justo viverra mattis. Curabitur eget ipsum turpis. Praesent ut arcu facilisis, sollicitudin felis et, suscipit dolor.	7cbea5e9-b474-4679-9e0a-c135b9809910	\N	2021-06-04 23:09:28.166+01	2021-06-04 23:09:28.17+01
cfc29aa5-6c94-4779-bc28-4056093447af	Lorem ipsum dolor sit amet, consectetur adipiscing elit.	Praesent eu dolor erat. Fusce vitae tincidunt libero, vel rutrum diam. Quisque a vestibulum tortor, ac dictum ipsum. Phasellus at bibendum mauris. Integer vel vehicula nulla. Integer a varius nunc, at ultricies magna. Duis nec tempor turpis. Morbi molestie mollis justo eget facilisis. Aliquam tincidunt blandit massa quis pellentesque. Nunc at ligula ut urna volutpat sagittis. Praesent felis nulla, convallis sed turpis ac, vulputate pharetra purus. Fusce ex quam, laoreet ut lacinia et, condimentum nec nibh. Cras commodo elit id justo viverra mattis. Curabitur eget ipsum turpis. Praesent ut arcu facilisis, sollicitudin felis et, suscipit dolor.	82c40c0c-0058-4558-b512-bf4fe468a250	dc0b4636-a567-4a32-9e3d-4fb64d919292	2021-06-04 23:10:20.124+01	2021-06-04 23:10:20.143+01
cc09d572-b8c4-47a2-9288-5e1d6d512009	Nullam a dignissim magna. Donec laoreet ipsum ac elit tincidunt, sed consequat neque porta.	Fusce ornare nunc et metus aliquam, eu imperdiet arcu fringilla. Nulla aliquet, arcu pellentesque faucibus hendrerit, nunc orci efficitur metus, sit amet ultrices felis enim id est. Phasellus a odio non tellus gravida mattis. In hac habitasse platea dictumst. Nulla consectetur nunc eget scelerisque interdum. Suspendisse potenti. Fusce nec facilisis quam. Ut gravida vehicula egestas. Vestibulum nisl ligula, porttitor sit amet magna sed, convallis mattis augue.\r\n\r\nNullam a dignissim magna. Donec laoreet ipsum ac elit tincidunt, sed consequat neque porta. Mauris maximus orci nisi, et condimentum mi varius eu. Quisque sed facilisis est. In hac habitasse platea dictumst. Nulla at ultricies mi. Suspendisse congue finibus sollicitudin. Vestibulum sit amet pulvinar nunc. Donec pretium ornare risus non lobortis. Curabitur eleifend tortor fringilla est congue, nec vestibulum velit tincidunt. Pellentesque pellentesque quam eu pellentesque varius.\r\n\r\nEtiam a tortor et ante efficitur vehicula sed a purus. Fusce auctor elit non pulvinar auctor. Cras congue tortor quis cursus lacinia. Vestibulum tincidunt mauris dui, et pulvinar nunc lobortis et. Cras ultricies nibh ut volutpat accumsan. Vivamus quis nulla massa. Nam odio dolor, ultricies et odio vel, varius condimentum turpis. Ut efficitur est non euismod tincidunt.\r\n\r\nPellentesque id bibendum nulla. Sed tempus ante a mauris condimentum feugiat. Donec pellentesque dui nec lacus feugiat dapibus. Proin at ante a ligula scelerisque accumsan. Sed pellentesque eros id odio varius, nec ultrices neque ultricies. Praesent tincidunt lectus sed quam tincidunt elementum. Maecenas eget massa in nunc fringilla ornare ac vitae urna. Nulla mattis urna in augue malesuada egestas.	82c40c0c-0058-4558-b512-bf4fe468a250	13aa3713-45c4-401a-abd7-2213ba91e1a6	2021-06-04 23:10:40.88+01	2021-06-04 23:10:40.9+01
f860d040-d376-4186-9829-3a8a0eb16b6b	Maecenas ac massa convallis, ullamcorper leo luctus.	Gravida odio nec, tincidunt purus. Integer tempus nibh eu ex auctor.	7cbea5e9-b474-4679-9e0a-c135b9809910	dc0b4636-a567-4a32-9e3d-4fb64d919292	2021-06-04 23:12:55.765+01	2021-06-04 23:12:55.78+01
\.


--
-- Data for Name: Tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Tags" (id, name) FROM stdin;
7aa690b0-bc11-408b-a5cf-38049940cc8a	lorem
e195ccb8-f935-42a2-b00b-9fd6b08bfe34	ipsum
78727b8a-b347-475c-a37b-c03275512931	dolor
0fbd8671-5eb9-4535-9b26-800cc0d110db	sit
741cbfc9-1db5-40c2-8721-34763065ce0e	amet
\.


--
-- Data for Name: UserGroups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UserGroups" ("userId", "groupId") FROM stdin;
82c40c0c-0058-4558-b512-bf4fe468a250	dc0b4636-a567-4a32-9e3d-4fb64d919292
7cbea5e9-b474-4679-9e0a-c135b9809910	dc0b4636-a567-4a32-9e3d-4fb64d919292
82c40c0c-0058-4558-b512-bf4fe468a250	13aa3713-45c4-401a-abd7-2213ba91e1a6
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Users" (id, "firstName", "lastName", "profilePhoto", "googleId") FROM stdin;
82c40c0c-0058-4558-b512-bf4fe468a250	Kamil	Muzyka	https://lh3.googleusercontent.com/a-/AOh14GjwjVWw-hbFbKshYi-zE_nF7TySlhFmJVclnBWL=s96-c	110366258354811466591
7cbea5e9-b474-4679-9e0a-c135b9809910	Kamil	Muzyka	https://lh3.googleusercontent.com/a-/AOh14Gjdp2n9HZ57bsVycNmbUGI8cCl6rcCullFoF1trIw=s96-c	112678578548731196574
\.


--
-- Name: Answers Answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_pkey" PRIMARY KEY (id);


--
-- Name: Files Files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Files"
    ADD CONSTRAINT "Files_pkey" PRIMARY KEY (id);


--
-- Name: Groups Groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Groups"
    ADD CONSTRAINT "Groups_pkey" PRIMARY KEY (id);


--
-- Name: PostTags PostTags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostTags"
    ADD CONSTRAINT "PostTags_pkey" PRIMARY KEY ("postId", "tagId");


--
-- Name: Posts Posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_pkey" PRIMARY KEY (id);


--
-- Name: Tags Tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_pkey" PRIMARY KEY (id);


--
-- Name: UserGroups UserGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserGroups"
    ADD CONSTRAINT "UserGroups_pkey" PRIMARY KEY ("userId", "groupId");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Answers Answers_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Answers Answers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Files Files_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Files"
    ADD CONSTRAINT "Files_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: PostTags PostTags_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostTags"
    ADD CONSTRAINT "PostTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Posts"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PostTags PostTags_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PostTags"
    ADD CONSTRAINT "PostTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tags"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Posts Posts_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Groups"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Posts Posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserGroups UserGroups_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserGroups"
    ADD CONSTRAINT "UserGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Groups"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserGroups UserGroups_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserGroups"
    ADD CONSTRAINT "UserGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

