const show = document.querySelector("#dataShow")

document.addEventListener("DOMContentLoaded", () => {

    const getData = async () => {

        const getApi = await fetch("https://dummyjson.com/products")

        const dataParse = await getApi.json()

        const result = dataParse.products

        console.log(result)

        result.forEach((e) => {
            show.innerHTML += `
                <tr>
                    <td>${e.id}</td>
                    <td>${e.title}</td>
                    <td>${e.price}</td>
                </tr>
            `
        })
    }

    getData()
})