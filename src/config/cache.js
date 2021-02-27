import { makeVar, InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";

var a = 0, f;

/*            
localStorage.setItem("cart", JSON.stringify([{productId: "5f232e846df6d81ddc9e9524", size: "80", count: "9", name: "Vintage Oil", photo: "https://images.immediate.co.uk/production/volatile/sites/10/2018/02/74846766-25a5-4c7b-93eb-03e16190720c-763b3d2.jpg?quality=45&resize=960,640", price: "800"}, {photo: "https://images.immediate.co.uk/production/volatile/sites/10/2018/02/74846766-25a5-4c7b-93eb-03e16190720c-763b3d2.jpg?quality=45&resize=960,640", price: "200", name: "Herbal Care Gel", productId: "5f204f2c9d97e9007a144063", size: "50", count: "2"}]))
*/

if(localStorage.getItem("cart")){         
    try{
        f = JSON.parse(localStorage.getItem("cart"));

        for(let i=0; i<f.length; i++)
            a += Number(f[i].count);
            
    } catch(e) {
        localStorage.removeItem("cart");
    }    
}

if(Number(a) > 100){
    a = '100+';
}

export const cartNo = makeVar(`(${a})`);

export const cursor = makeVar('');

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                cartNo: {
                    read() {
                        return cartNo();
                    }
                },
                products: concatPagination(["gender", "search"])
            }
        }
    },
    addTypename: false
});
