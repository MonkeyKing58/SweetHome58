<template>
  <div>
    
    <Loader v-if="loading" />

    <div v-else>

      <el-form
        class="form"
        label-position="top"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
      >

        <el-form-item>
          <h1>Создать аккаунт</h1>
        </el-form-item>
    
        <!-- <el-form-item label="Имя" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item> -->

        <el-form-item label="Email" prop="email">
          <el-input label="top" v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="margin-top:1rem;" icon="el-icon-check" @click="submitForm('ruleForm')">Зарегистрироваться</el-button>
        </el-form-item>

        <el-form-item class="inline-content" >
          Уже есть аккаунт? 
          <el-button type="text"><router-link to="/login">Войти</router-link></el-button>
        </el-form-item>

      </el-form>

    </div>

  </div>
</template>

<script>
import { useMeta } from 'vue-meta'
import messages from '@/utils/messages'

export default {
  name: 'register',

  data: () => {
    return {
      loading: true,

      ruleForm: {
        email:'',
        pass: '',
        name: ''
      },
      rules: {
        pass: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          { min: 6, message: 'Пароль должен содержать минимум 6 символов', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: 'Введите e-mail', trigger: 'blur' },
          { type: 'email', message: 'Введите корректный e-mail', trigger: ['blur', 'change'] }
        ],
      }
    }
  },

  mounted() {    

    useMeta({
      title: 'Регистрация личного кабинета | SweetHome58',
    })

    this.loading = false
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const formData = {
            email: this.ruleForm.email,
            pass: this.ruleForm.pass,
          }

          try {
            await this.$store.dispatch('register', formData)
            this.$router.push('/lk')

            this.$message({
              message: messages['register'].message,
              type: messages['register'].type
            })
          } catch(e) {
            console.log(e)
          }
        } else {
          return false;
        }
      })
    }
  },

  components: {
  }
}

</script>



<style scoped lang="sass">

.form
  width: 100%
  padding: 1rem 2.5rem

  *
    width: 100%
    text-align: center

  .inline-content

    *
      width: auto



</style>