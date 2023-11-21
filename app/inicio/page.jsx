//import { ListaNoticias } from "@/componentes/noticias/listaNoticias";
'use client';
import { createContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { inicio_sesion } from '../componentes/hooks/Autenticacion';
import { estaSesion } from '../componentes/hooks/SessionUtil';
import mensajes from '../componentes/Mensajes';
const MyContext = createContext();
import { useRouter } from 'next/navigation';


export default function Page() {
    //-----------------------------------------
    const router = useRouter();
    //-----------------------------------------
    const validationSchema = Yup.object().shape({
        clave: Yup.string().required('Ingrese su clave'),
        identificador: Yup.string().required('Ingrese su identificacion')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const sendData = (data) => {
        var data = { "identificador": data.identificador, "clave": data.clave, "funcion": "inicio" };
        inicio_sesion(data).then((info) => {
            if (!estaSesion()) {
                mensajes("Error en inicio de sesion", info.msg, "error");
            } else {
                mensajes("Has ingresado al sistema!", "Bienvenido usuario");
                router.push('/autos');
            }
        });
    };

    return (
        <section className="text-center text-lg-start">


            <div className="container py-4" style={{ cascading: "margin-right: -50px", media: "max-width: 991.98px" }}>
                <div className="row g-0 align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="card cascading-right">
                            <div className="card-body p-5 shadow-5 text-center">
                                <h2 className="fw-bold mb-5">Iniciar sesion</h2>
                                <form onSubmit={handleSubmit(sendData)}>
                                    <div className="form-outline mb-4">
                                        <input {...register('identificador')} name="identificador" id="identificador" className={`form-control ${errors.identificador ? 'is-invalid' : ''}`} />
                                        <label className="form-label" >Nùmero de cedula</label>
                                        <div className='alert alert-danger invalid-feedback'>{errors.identificador?.message}</div>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <input {...register('clave')} type='password' name="clave" id="clave" className={`form-control ${errors.clave ? 'is-invalid' : ''}`} />
                                        <label className="form-label" >Clave</label>
                                        <div className='alert alert-danger invalid-feedback'>{errors.clave?.message}</div>
                                    </div>


                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Iniciar sesion
                                    </button>

                                    <div className="text-center">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <img src="https://images.unsplash.com/photo-1603575283711-63ed37bc0ce6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMHBsYXRlfGVufDB8fDB8fHww&w=1000&q=80" className="w-100 rounded-4 shadow-4"
                            alt="" style={{ margin: "50px" }} />
                    </div>
                </div>
            </div>

        </section>
    );
}