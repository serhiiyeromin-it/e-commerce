export default function Dashboard() {
    return (
        <div>
            <h1>Личный кабинет</h1>
            <p>Добро пожаловать в свою учетную запись!</p>
            <button onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}>Выйти</button>
        </div>

    );
}
