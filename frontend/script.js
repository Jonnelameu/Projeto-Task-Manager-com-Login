let token = "";

const apiUrl = "http://localhost:5000/api";

// Registrar usuário
document.getElementById("registerBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${apiUrl}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        console.log("Registro:", data);

        if (res.ok) {
            alert("Usuário registrado! Faça login.");
        } else {
            alert("Erro ao registrar usuário");
        }

    } catch (err) {
        console.error("Erro no registro:", err);
    }
});


// Login
document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const res = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        console.log("Resposta do login:", data);

        if (data.token) {

            // remove possíveis aspas
            token = data.token.replace(/['"]+/g, "");

            document.getElementById("auth").style.display = "none";
            document.getElementById("tasks").style.display = "block";

            loadTasks();

        } else {
            alert("Erro no login!");
        }

    } catch (err) {
        console.error("Erro no login:", err);
    }
});


// Adicionar tarefa
document.getElementById("addTaskBtn").addEventListener("click", async () => {
    const title = document.getElementById("taskTitle").value;

    try {

        await fetch(`${apiUrl}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title })
        });

        document.getElementById("taskTitle").value = "";

        loadTasks();

    } catch (err) {
        console.error("Erro ao adicionar tarefa:", err);
    }
});


// Carregar tarefas
async function loadTasks() {

    try {

        const res = await fetch(`${apiUrl}/tasks`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {

            const text = await res.text();

            if (res.status === 401) {

                alert("Token inválido ou expirado. Faça login novamente.");

                document.getElementById("tasks").style.display = "none";
                document.getElementById("auth").style.display = "block";

                token = "";
            }

            console.error("Erro ao carregar tasks:", text);

            return;
        }

        const tasks = await res.json();

        const list = document.getElementById("taskList");

        list.innerHTML = "";

        tasks.forEach((task) => {

            const li = document.createElement("li");

            li.textContent = task.title;

            list.appendChild(li);
        });

    } catch (err) {

        console.error("Erro na requisição:", err);
    }
}


// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {

    token = "";

    document.getElementById("tasks").style.display = "none";
    document.getElementById("auth").style.display = "block";

});