/**
 * Created by Afro on 3/21/2017.
 */
function solution(N) {
    for (var i = 1; i <= N; i++){
        if (i%3 === 0 && i%5 === 0 && i%7 === 0){
            console.log('FizzBuzzWoof')
        }
        else if (i%3 === 0 && i%5 === 0){
            console.log('FizzBuzz')
        }
        else if (i%7 === 0){
            console.log('Woof')
        }
        else if (i%5 === 0){
            console.log('Buzz')
        }
        else if (i%3 === 0){
            console.log('Fizz')
        }
        else {
            console.log(i)
        }
    }

}
solution(1000);