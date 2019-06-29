export class Auxiliar {
    public static convertBaseb64ToBlob(b64Data, contentType): Blob {
        contentType = contentType || '';
        const sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        const byteCharacters = window.atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
             const slice = byteCharacters.slice(offset, offset + sliceSize);
             const byteNumbers = new Array(slice.length);
             for (let i = 0; i < slice.length; i++) {
                 byteNumbers[i] = slice.charCodeAt(i);
             }
             const byteArray = new Uint8Array(byteNumbers);
             byteArrays.push(byteArray);
        }
       return new Blob(byteArrays, {type: contentType});
    }

    public static toParams(modelo){
        let obj = {};
        for(let key in modelo){
            obj[key] = String(modelo[key]);
        }
        return obj;
    }

    public static isNullorUndefined(x):boolean{
        if (x == null) {
            return true;
        }
    
        if (x === null) {
            return true;
        }
    
        if (typeof x === 'undefined') {
            return true;
        }
        return false;
    }

    public static dateTimeMonthNames:string[] = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    public static binarySearch (list, value ,key='id') {
        // initial values for start, middle and end
        let start = 0
        let stop = list.length - 1
        let middle = Math.floor((start + stop) / 2)
      
        // While the middle is not what we're looking for and the list does not have a single item
        while (list[middle] !== value && start < stop) {
          if (value[key] < list[middle][key]) {
            stop = middle - 1
          } else {
            start = middle + 1
          }
      
          // recalculate middle on every iteration
          middle = Math.floor((start + stop) / 2)
        }
      
        // if the current middle item is what we're looking for return it's index, else return -1
        return (list[middle][key] !== value[key]) ? -1 : middle
    }

    public static insertionSort (items) {
        for (var i = 0; i < items.length; i++) {
          let value = items[i]
          // store the current item value so it can be placed right
          for (var j = i - 1; j > -1 && items[j] > value; j--) {
            // loop through the items in the sorted array (the items from the current to the beginning)
            // copy each item to the next one
            items[j + 1] = items[j]
          }
          // the last item we've reached should now hold the value of the currently sorted item
          items[j + 1] = value
        }
      
        return items
    }

    public static  insertAt(list:[any], index, newItem){
        return [list.slice(0, index),newItem,list.slice(index)];
        
    }

    public static insertionOrder(list,value,key='id'){
        let index = this.binarySearch(list,value,key);
        return this.insertAt(list,index,value);
    }
}