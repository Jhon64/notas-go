
export const localStorageHelper = {
  createItem: (name: string, data: any) => {
    if (typeof data == 'string') {
      localStorage.setItem(name, data)
    }
    if (typeof data == 'object') {
      localStorage.setItem(name, JSON.stringify(data))
    }
  },
  deleteItems: (names: string[]) => {
    if(names.length>0){
      for(let name of names){
        localStorage.removeItem(name)
      }
    }
    
  },
  deleteItem: (name: string) => {
    localStorage.removeItem(name)
  },
  getToken: () => {
    return localStorage.getItem('_token')
  },
  getItemObject: (name: string) => {
    const item = localStorage.getItem(name)
    if (item) {
      return JSON.parse(item)
    } else return null
  },
  getItemString: (name: string) => {
    return localStorage.getItem(name)
  },
  clearAll: () => {
    localStorage.clear()
  },
}