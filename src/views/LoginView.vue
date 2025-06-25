<script setup>
import {ref} from "vue";
import {useLogin} from "@/useLogin.js";
import { useRouter } from 'vue-router'

const router = useRouter();
const {login} = useLogin();

const email = ref('');
const password = ref('');

async function handleLogin() {
  await login(email.value, password.value);
  await router.push('/trainings');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend class="fieldset-legend">Login</legend>

    <label class="label">Email</label>
    <input v-model="email" type="email" class="input validator" required placeholder="Email" />
    <div class="validator-hint">Enter valid email address</div>

    <label class="label">Password</label>
    <input v-model="password" type="password" class="input" required placeholder="Password" />

    <button class="btn btn-neutral mt-4" @click="handleLogin" v-bind:disabled="!email || !password">Login</button>
    </fieldset>
  </div>
</template>
