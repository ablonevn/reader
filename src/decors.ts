// import "reflect-metadata";
//
// export function autoState() {
//
//     return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
//
//         Reflect.defineProperty(target,"mapProps",{
//             get:()=>{
//                 return (state, ownProps)=>{
//                     return Object.assign({},state[propertyKey.toLowerCase()])
//                 }
//             },
//             configurable:true,
//             writable:false,
//             enumerable:true
//         });
//
//
//     };
// }