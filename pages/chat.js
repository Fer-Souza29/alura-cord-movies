import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'


const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


function escutaMsgTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new)
        }).subscribe();
}


export default function ChatPage() {
    // Sua lógica vai aqui

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listadeMensagens, setListaDemensagens] = React.useState([]);



    React.useEffect(() => {
        supabaseClient.from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('dados da consulta', data);
                setListaDemensagens(data);
            });

        escutaMsgTempoReal((novaMensagem) => {
            setListaDemensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

    }, []);

    // ./Sua lógica vai aqui

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {

            //  id: listadeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        }
        supabaseClient
            .from('mensagens')
            .insert([
                // tem que ser um obj com os mesmos campos
                mensagem
            ])
            .then(({ data }) => {
                console.log(data)
            });
        setMensagem('');
    }

    // Sua lógica vai aqui

    // usr digitar no campo textarea
    // aperta enter para enviar
    // adc texto na listagem


    // fazer desafio do botao deletar mensagens e estilo pos semana react.
    // ./Sua lógica vai aqui
    // usar on change, usar setstate ( ter if para caso seja enter para limpar a variavel)
    // lista de mensagens é um state, campo de msg
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listadeMensagens} />

                    {/* <MessageList mensagens={[]} /> */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'start',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{

                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                console.log('Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />

                        <Button
                            type='submit'
                            label='Enviar Mensagem'

                            onClick={(event) => {
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }}
                            styleSheet={{
                                height: '45.6px',

                                padding: '0',
                                margin: '0'
                            }
                            }
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.neutrals[500],
                            }}

                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {




    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>

                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                variant='tertiary'
                                colorVariant='neutral'
                                label='X'

                                onClick={(event) => {
                                    event.preventDefault();
                                }}

                                styleSheet={{
                                    marginTop: '0',
                                    marginRight: '5px',
                                    marginBottom: '0',
                                    marginLeft: '5px',

                                    paddingTop: '0',
                                    paddingRight: '2px',
                                    paddingBottom: '0',
                                    paddingLeft: '2px',
                                }}
                            />
                        </Box>

                        {/* declarativo  esse codigo verifica se a mensagem é um sticker*/}

                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                mensagem.texto
                            )}


                    </Text>
                )
            })}

        </Box>
    )
}


