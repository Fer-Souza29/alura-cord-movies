import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';



function Titulo(props) {
    console.log(props);
    const Tag = props.tag || 'h1';
    return (
        <div>
            <Tag>{props.children}</Tag>

            <style jsx>{`
                ${Tag}{
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>

        </div>

    );
}


export default function PaginaInicial() {

    const [username, setUsername] = React.useState('Fer-Souza29'); // hook para alterar estado da pagina
    const roteamento = useRouter(); // hooks de push para mudar de URL

    // desafio não mostrar imagem com usr com menos de 2 caracteres
    let userimg = `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`
    // if de gambiarra, mas, desafio concluido
    if (username.length >= 3) {
        userimg = `https://github.com/${username}.png`
    }

    /* codigo de desafio api não finalizado
    var url = 'https://api.github.com/users/Fer-Souza29'

    fetch(url)
        .then(resposta => resposta.json()).then((respostaConvertida) => {
            let dados = respostaConvertida

        })
*/


    return (
        <>

            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',

                    backgroundImage: 'url(https://media0.giphy.com/media/95OIHJppkEK6Q/giphy.gif?cid=790b76111ee1766b37253fee3d3b4d4f19e657bef357b3ef&rid=giphy.gif&ct=g)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: 'RGBA(0,0,0,0.55)',


                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infodoEvento) {
                            infodoEvento.preventDefault();
                            roteamento.push(`/chat?username=${username}`);
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Welcome!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[100] }}>
                            {appConfig.name}
                        </Text>

                        < TextField
                            fullWidth
                            value={username}

                            onChange={function (event) {

                                console.log('usuario digitou', event.target.value);
                                // onde tá o valor?
                                const valor = event.target.value;
                                // trocar o valor da variável
                                setUsername(valor);
                            }}
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />

                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth

                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.neutrals[500],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            /*
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            */
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}

                            src={userimg}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}