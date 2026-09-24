

const Student = () => {
    const arrObj = [
        {id: 1, name: "vinoth", mark: 98},
        {id: 2, name: "mohan", mark: 97},
        {id: 3, name: "tharun", mark: 98},
        {id: 4, name: "anbu", mark: 98},
        {id: 5, name: "hvdc", mark: 98},
        {id: 6, name: "wefvw", mark: 98},
        {id: 7, name: "hwvcvwu", mark: 98},
        {id: 8, name: "vjghdevg", mark: 98},
        {id: 9, name: "jbghv", mark: 98},
        {id: 10, name: "hvg", mark: 98}
    ]
  return (
    <div className="bg-blue-400 h-screen p-5 grid grid-cols-4 gap-5">

        {arrObj.map((e) => (
        
        <div key={e.id} className="bg-white w-50 h-40 p-10 items-center ">
            <p>Name:{e.name}</p>
            <p>Mark:{e.mark}</p>
        </div>

      ))}

    </div>

  )
}

export default Student