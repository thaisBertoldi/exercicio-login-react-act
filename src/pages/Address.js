import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from '../components/Address.module.css'
import axios from 'axios'
import * as Yup from "yup";

export default function Adress() {

  async function getCep(value, ...values) {
    const cep = value.replace('-', '');
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      values.forEach(el => {
        el.cep = data.cep.replace(/^(\d{5})(\d{3})/g, "$1-$2")
        el.bairro = data.bairro;
        el.cidade = data.localidade;
        el.logradouro = data.logradouro;
        el.complemento = data.complemento;
        el.estado = data.uf;
        el.ddd = data.ddd;
        el.telefone = el.telefone.replace(/(\d{5})(\d{4})/g, "$1-$2")
      })
    }
    catch (erro) {
      console.log("Erro ao tentar acessar api viacep" + erro)
    }
  }

  const validationSchema = Yup.object().shape({
    cep: Yup.string().required('O campo é obrigatório'),
    logradouro: Yup.string().required('O campo é obrigatório'),
    bairro: Yup.string().required('O campo é obrigatório'),
    cidade: Yup.string().required('O campo é obrigatório'),
    estado: Yup.string().required('O campo é obrigatório'),
    ddd: Yup.string().required('O campo é obrigatório'),
    telefone: Yup.string().required('O campo é obrigatório'),
  });

  return (
    <div className={styles.formContainer}>
      <h1>Address</h1>
      <Formik
        initialValues={{
          cep: '',
          logradouro: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          ddd: '',
          telefone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        {values => (
          <Form >
            <div className={styles.form}>
              <div className={styles.formItem}>
                <div><label htmlFor="cep">CEP</label></div>
                <div><Field id="cep" name="cep" placeholder="00000-000" onBlur={(e) => getCep(e.target.value, values.values)} pattern='(\d){5}-?(\d){3}' title='Cep precisa conter oito dígitos' /></div>

              </div>

              <div className={styles.formItem}>
                <div><label htmlFor="logradouro">Logradouro</label></div>
                <div><Field id="logradouro" name="logradouro" placeholder="Logradouro" pattern='[A-Za-z]{3,25}' title='Somente letras podem ser inseridas aqui' /></div>
                <ErrorMessage name='logradouro' />
              </div>

              <div className={styles.formItem}>
                <div><label htmlFor="complemento">Complemento</label></div>
                <div><Field id="complemento" name="complemento" placeholder="Complemento" pattern='[A-Za-z]{3,25}' title='Somente letras podem ser inseridas aqui' /></div>
              </div>

              <div className={styles.formItem}>
                <div><label htmlFor="bairro">Bairro</label></div>
                <div><Field id="bairro" name="bairro" placeholder="Bairro" pattern='[A-Za-z]{3,25}' title='Somente letras podem ser inseridas aqui' /></div>
                <ErrorMessage name='bairro' />
              </div>

              <div className={styles.formItem}>
                <div><label htmlFor="cidade">Cidade</label></div>
                <div><Field id="cidade" name="cidade" placeholder="Cidade" pattern='[A-Za-z]{3,25}' title='Somente letras podem ser inseridas aqui' /></div>
                <ErrorMessage name='cidade' />
              </div>

              <div className={styles.formItem}>
                <div><label htmlFor="estado">Estado</label></div>
                <div><Field id="estado" name="estado" placeholder="Estado" pattern='[A-Za-z]{2,25}' title='Somente letras podem ser inseridas aqui' /></div>
                <ErrorMessage name='estado' />
              </div>

              <div className={styles.formItem}>
                <div><label htmlFor="ddd">DDD</label></div>
                <div><Field id="ddd" name="ddd" placeholder="DDD" pattern='(\d){2}' title='DDD precisa conter dois dígitos' /></div>
                <ErrorMessage name='ddd' />
              </div>

              <div className={styles.formItem}>
                <div><label htmlFor="telefone">Telefone</label></div>
                <div><Field id="telefone" name="telefone" placeholder="Telefone" pattern='(\d){5}-?(\d){4}' title='Telefone precisa conter nove dígitos' /></div>
                <ErrorMessage name='telefone' />
              </div>
            </div>

            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
}
