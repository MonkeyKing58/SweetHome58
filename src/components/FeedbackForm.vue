<template>
  <el-form
    :model="addFeedback"
    label-position="top"
    status-icon
    :rules="rules"
    ref="addFeedback"
    class="form"
  >

    <el-form-item>
      <h3>Новый отзыв</h3>
    </el-form-item>

    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model="addFeedback.name"></el-input>
    </el-form-item>

    <el-form-item label="Отзыв" prop="text">
      <el-input
        type="textarea"
        :rows="5"
        resize="none"
        maxlength="2000"
        show-word-limit
        v-model="addFeedback.text"
      ></el-input>
    </el-form-item>

    <el-button-group>
      <el-button
        type="primary"
        @click="submitForm('addFeedback')"
        icon="el-icon-check"
        class="recolor-blue-button"
      >Ок</el-button>
      <el-button type="default" icon="el-icon-close" @click="hideForm()">Отмена</el-button>
    </el-button-group>

  </el-form>
</template>


<script>
import axios from 'axios'

export default {
  name: 'feedback-form',
  data: () => {
    return {
      addFeedback: {
        name:'',
        text: ''
      },
      rules: {
        name: [
          { required: true, message: 'Введите имя', trigger: 'change' },
          { min: 3, message: 'Имя должно содержать не менее 3-х символов', trigger: 'change' }
        ],
        text: [
          { required: true, message: 'Введите отзыв', trigger: 'change' }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const formData = {
            name: this.addFeedback.name,
            text: this.addFeedback.text
          }

          console.log(formData)

          try {
            const reqBody = JSON.stringify(formData)

            await axios.post('https://sweethome58.ru/api/add_new_feedback.php', reqBody)

            this.hideForm()

            this.$message({
              message: 'Ваш отзыв отправлен на проверку.',
              type: 'success'
            });

          } catch(e) {
            console.log(e)
          }

        } else {
          return false;
        }
      })
    },

    hideForm() {
      this.$emit('closeform')
      this.addFeedback.name = ''
      this.addFeedback.text = ''
    }
  }
}

</script>

<style lang="sass" scoped>

.form
  margin-top: 1rem
  background-color: #f8f8f8
  padding: 5px 12px 12px 12px!important
  border-radius: 5px
  box-shadow: inset 0 0 5px #e8e8e8
  border: solid 1px #eee


</style>