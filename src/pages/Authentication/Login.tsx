import React from "react";

// Formik validation
import * as Yup from "yup";
import { useFormik as useFormic } from "formik";

// Image
import logoLight from "assets/images/vamosbici-logo.png";
import logoDark from "assets/images/vamosbici-logo.png";
import logoCatamarca from "assets/images/catamarca-logo.png";
import logoNodo from "assets/images/logo-nodo.png";
import { loginUser } from "slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "Common/withRouter";
import AuthIcon from "pages/Authentication/AuthenticationInner/AuthIcon";
import { Link } from "react-router-dom";

const Login = (props: any) => {
    document.title = "Login | Vamos en Bici";
    const dispatch = useDispatch<any>();

    const { error } = useSelector((state: any) => state.Login)

    const validation: any = useFormic({
        enableReinitialize: true,

        initialValues: {
            username: "admin" || '',
            password: "12345678" || '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("El usuario es requerido."),
            password: Yup.string().required("La contraseña es requerida."),
        }),
        onSubmit: (values: any) => {
            dispatch(loginUser(values, props.router.navigate));
        }
    });

    React.useEffect(() => {
        const bodyElement = document.body;

        bodyElement.classList.add('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zink-800', 'dark:text-zink-100', 'font-public');

        return () => {
            bodyElement.classList.remove('flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10', 'bg-slate-50', 'dark:bg-zink-800', 'dark:text-zink-100', 'font-public');
        }
    }, []);

    return (
        <React.Fragment>
            <div className="relative">
                <AuthIcon />

                <div className="mb-0 w-screen lg:mx-auto lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
                    <div className="!px-10 !py-12 card-body">
                        <Link to="/">
                            <img src={logoLight} alt="" className="hidden w-48 h-24 mx-auto dark:block" />
                            <img src={logoDark} alt="" className="block w-48 h-24 mx-auto dark:hidden" />
                        </Link>

                        <div className="mt-8 text-center">
                            <h4 className="mb-1 text-custom-500 dark:text-custom-500">Bienvenido</h4>
                            <p className="text-slate-500 dark:text-zink-200">Ingresa tus datos para continuar.</p>
                        </div>

                        <form className="mt-10" id="signInForm"
                            onSubmit={(event: any) => {
                                event.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}>
                                
                            {error && <div className="px-4 py-3 mb-3 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50" id="successAlert">
                                Ha ocurrido un <b>error</b> al iniciar sesión.
                            </div>} 
                           
                            <div className="mb-3">
                                <label htmlFor="email" className="inline-block mb-2 text-base font-medium">Usuario</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter username or email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.username || ""}
                                />
                                {validation.touched.username && validation.errors.username ? (
                                    <div id="email-error" className="mt-1 text-sm text-red-500">{validation.errors.username}</div>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password || ""}
                                />
                                {validation.touched.password && validation.errors.password ? (
                                    <div id="password-error" className="mt-1 text-sm text-red-500">{validation.errors.password}</div>
                                ) : null}
                            </div>

                            <div className="mt-8">
                                <button type="submit" className="w-full text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">Iniciar Sesión</button>
                            </div>

                            <div className="mt-10 flex justify-between h-10">
                                <img src={logoCatamarca} alt="" className="w-36" />
                                <img src={logoNodo} alt="" className="w-10 rounden rounded-md" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withRouter(Login);