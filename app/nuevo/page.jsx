'use client';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { obtener, enviar} from '../componentes/hooks/Conexion';
import mensajes from '../componentes/Mensajes';
import { getToken } from '../componentes/hooks/SessionUtilClient';
import { useRouter } from 'next/navigation';

export default function Page() {
    const validationSchema = Yup.object().shape({
        descripcion: Yup.string().required('Ingrese una descripcion'),
        subtotal: Yup.string().required('Ingrese el valor del subrtotal'),
        iva: Yup.string().required('Ingrese el calor del iva'),
        total: Yup.string().required('Ingrese el valor total'),
        descuento: Yup.string().required('Ingrese el descuento'),
        placa: Yup.string().required('Ingrese la placa'),
        chasis: Yup.string().required('Ingrese nro de chasis'),
        foto: Yup.string().required('Ingrese url de la imagen'),
        marca: Yup.string().required('Escoge una marca')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    //const { register, handleSubmit, formState } = useForm(formOptions);
    const { register, setValue, watch, handleSubmit, formState } = useForm(formOptions);
    const router = useRouter();
    const { errors } = formState;
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        const obtenerMarcas = async () => {
            try {
                const response = await obtener('index.php?funcion=marcas');
                const resultado = response.datos;
                console.log("aaaaaaaaaa", resultado);
                setMarcas(resultado)
                console.log(marcas.datos);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        obtenerMarcas();
    }, []);

    const onSubmit = (data) => {
      const externalUsuario = obtenerExternalUsuario();  // Obtener el external del sessionStorage
  
      if (!externalUsuario) {
          console.error("No se pudo obtener el external del usuario desde el sessionStorage");
          return;
      }
  
      const newData = {
          "descripcion": data.descripcion,
          "subtotal": data.subtotal,
          "iva": data.iva,
          "total": data.total,
          "descuento": data.descuento,
          "placa": data.placa,
          "chasis": data.chasis,
          "foto": data.foto,
          "user": externalUsuario,  // Utilizar el external dinámicamente
          "marca": data.marca,
          "funcion": "guardarAuto"
      };
  
      const token = getToken();
      console.log("kjskcshdlc", token);
  
      enviar('index.php', newData, token).then((info) => {
          if (info === '') {
              mensajes("Error en inicio de sesion", info.msg, "error");
          } else {
              console.log(info);
              mensajes("Buen trabajo!", "REGISTRADO CON ÉXITO");
              router.push('/autos');
          }
      });
  };

      
  function obtenerExternalUsuario() {
    const external = sessionStorage.getItem('id');
    console.log("External obtenido:", external);
    return external;
}

    return (
        <div className="container" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: '50px' }}>
          <h2 className="text-center">Registrar Auto</h2>
          <div className="wrapper">
            <div className="d-flex flex-column">
              <div className="content">
                <div className='container-fluid'>
                  <form className="user" style={{ marginTop: '20px' }} onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-outline mb-4">
                          <label className="form-label">Descripcion</label>
                          <input {...register('descripcion')} name="descripcion" id="descripcion" className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} />
                          <div className='alert alert-danger invalid-feedback'>{errors.descripcion?.message}</div>
                        </div>
      
                        <div className="form-outline mb-4">
                          <label className="form-label">Subtotal</label>
                          <input {...register('subtotal')} name="subtotal" id="subtotal" className={`form-control ${errors.subtotal ? 'is-invalid' : ''}`} />
                          <div className='alert alert-danger invalid-feedback'>{errors.subtotal?.message}</div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-outline mb-4">
                          <label className="form-label">Porcentaje de IVA</label>
                          <input {...register('iva')} name="iva" id="iva" className={`form-control ${errors.iva ? 'is-invalid' : ''}`} />
                          <div className='alert alert-danger invalid-feedback'>{errors.iva?.message}</div>
                        </div>
      
                        <div className="form-outline mb-4">
                          <label className="form-label">Descuento</label>
                          <input {...register('descuento')} name="descuento" id="descuento" className={`form-control ${errors.descuento ? 'is-invalid' : ''}`} />
                          <div className='alert alert-danger invalid-feedback'>{errors.descuento?.message}</div>
                        </div>
                      </div>
                    </div>
      
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-outline mb-4">
                          <label className="form-label">Placa</label>
                          <input {...register('placa')} name="placa" id="placa" className={`form-control ${errors.placa ? 'is-invalid' : ''}`} />
                          <div className='alert alert-danger invalid-feedback'>{errors.placa?.message}</div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-outline mb-4">
                          <label className="form-label">Chasis</label>
                          <input {...register('chasis')} name="chasis" id="chasis" className={`form-control ${errors.chasis ? 'is-invalid' : ''}`} />
                          <div className='alert alert-danger invalid-feedback'>{errors.chasis?.message}</div>
                        </div>
                      </div>
                    </div>
      
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-outline mb-4">
                          <label className="form-label">Foto</label>
                          <input {...register('foto')} name="foto" id="foto" className={`form-control ${errors.foto ? 'is-invalid' : ''}`} />
                          <div className='alert alert-danger invalid-feedback'>{errors.foto?.message}</div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Marca</label>
                          <select className='form-control' {...register('marca', { required: true })} onChange={(e) => setValue('marca', e.target.value)}>
                            <option value="">Elija una marca</option>
                            {Array.isArray(marcas) && marcas.map((mar, i) => (
                              <option key={i} value={mar.external_id}>
                                {mar.nombre}
                              </option>
                            ))}
                          </select>
                          {errors.marca && errors.marca.type === 'required' && <div className='alert alert-danger'>Seleccione una marca</div>}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-outline mb-4">
                          <label className="form-label">Total</label>
                          <input {...register('total')} name="total" id="total" className={`form-control ${errors.total ? 'is-invalid' : ''}`} />
                          <div className='alert alert-danger invalid-feedback'>{errors.total?.message}</div>
                        </div>
                      </div>
                    </div>
      
                    <div className="row">
                      <div className="col-lg-12">
                        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                          <a href="/autos" className="btn btn-danger btn-rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            <span style={{ marginLeft: '5px' }}>Cancelar</span>
                          </a>
                          <input className="btn btn-success btn-rounded" type='submit' value='Registrar'></input>
                        </div>
                      </div>
                    </div>
                  </form>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}