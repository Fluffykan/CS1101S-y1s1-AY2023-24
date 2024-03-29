const treeA = list(1, 2, 3, 4);
const treeB = list(list(1, 2), list(3, 4));
const treeC = list(list(1, 2), null, 3, list(4, null));
const rand_lst = list(3,4,1,2);


function add_tree(tr) {
    if(is_null(tr)) {
        return 0;
    } else {
        if (!is_list(head(tr))) {
            return head(tr) + add_tree(tail(tr));
        } else {
            return add_tree(head(tr)) + add_tree(tail(tr));
        }
    }
}

function count_tree(tr) {
    if (is_null(tr)) {
        return 0;
    } else {
        if (!is_list(head(tr))) {
            return 1 + count_tree(tail(tr));
        } else {
            return count_tree(head(tr)) + count_tree(tail(tr));
        }
    }
}

function flatten_tree(tr) {
    if(is_null(tr)) {
        return null;
    } else {
        if (!is_list(head(tr))) {
            return pair(head(tr), flatten_tree(tail(tr)));
        } else {
            return append(flatten_tree(head(tr)), flatten_tree(tail(tr)));
        }
    }
}

function map_tree(tr, f) {
    return map(x => !is_list(x) 
                    ? f(x)
                    : map_tree(x, f), tr);
}

function insertion_sort(lst) {
    function smallest(lst) {
        let s = Infinity;
        let l = lst;
        while(!is_null(l)) {
            head(l) < s ? s = head(l) : 0;
            l = tail(l);
        }
        return s;
    }
    
    if (is_null(lst)) {
        return null;
    } else {
        const s = smallest(lst);
        display(s);
        return pair(s, insertion_sort(remove(s, lst)));
    }
}

function insertion_sort_array(arr) {
    if (arr[0] === undefined) {
        return arr;
    } else {
        let ptr = 0;
        let trav = 1;
        let smallest = ptr;
        let temp = undefined;
        while (arr[ptr] !== undefined) {
            smallest = ptr;
            while (arr[trav] !== undefined) {
                arr[trav] < arr[smallest] ? smallest = trav : 0;
                trav = trav + 1;
            }
            temp = arr[smallest];
            arr[smallest] = arr[ptr]; 
            arr[ptr] = temp;
            ptr = ptr + 1;
            trav = ptr + 1;
        }
        return arr;
    }
}


function merge_sort(lst) {
    if(is_null(lst) || is_null(tail(lst))) {
        return lst;
    } else {
        function take(lst, x) {
            if (x === 0) {
                return null;
            } else {
                return pair(head(lst), take(tail(lst), x - 1));
            }
        }
        
        function drop(lst, x) {
            if (x === 0) {
                return lst;
            } else {
                return drop(tail(lst), x - 1);
            }
        }
        
        function merge(a, b) {
            if (is_null(a)) {
                return b;
            } else if (is_null(b)) {
                return a;
            } else {
                return head(a) < head(b) 
                        ? pair(head(a), merge(tail(a), b))
                        : pair(head(b), merge(a, tail(b)));
            }
        }
        
        
        const mid = math_floor(length(lst) / 2);
        const wish1 = merge_sort(take(lst, mid));
        const wish2 = merge_sort(drop(lst, mid));
        return merge(wish1, wish2);
    }
}


function merge_sort_array(A) {
    
    function merge_sort_helper(A, low, high) {
        if (low < high) {
            const mid = math_floor((low + high) / 2);
            merge_sort_helper(A, low, mid);
            merge_sort_helper(A, mid + 1, high);
            merge(A, low, mid, high);
        }
    }
    
    function merge(A, low, mid, high) {
        const B = [];
        let left = low;
        let right = mid + 1;
        let Bidx = 0;
        
        while (left <= mid && right <= high) {
            if (A[left] <= A[right]) {
                B[Bidx] = A[left];
                left = left + 1;
            } else {
                B[Bidx] = A[right];
                right = right + 1;
            }
            Bidx = Bidx + 1;
        }
        
        while (left <= mid) {
            B[Bidx] = A[left];
            Bidx = Bidx + 1;
            left = left + 1;
        }   
        while (right <= high) {
            B[Bidx] = A[right];
            Bidx = Bidx + 1;
            right = right + 1;
        }
        
        for (let k = 0; k < high - low + 1; k = k + 1) {
            A[low + k] = B[k];
        }
    }
        
    merge_sort_helper(A, 0, array_length(A) - 1);
}


// function flatten_bst(bst) {
//     const div = "; ";
//     if(is_empty_tree(bst)) {
//         return null;
//     } else {
//         const right = right_branch(bst);
//         const left = left_branch(bst);
//         const value = head(bst);
//         if (is_tree(right) && is_tree(left)) {
//             const r = binary_search_tree_to_string(right);
//             const l = binary_search_tree_to_string(left);
//             return append(l, append(list(value), r));
//         } else if (is_tree(right) && !is_tree(left)) {
//             const r = binary_search_tree_to_string(right);
//             // display("right tree");
//             // display(value);
//             // display(r);
//             // display("end");
//             return append(list(value), r);
//         } else if (!is_tree(right) && is_tree(left)) {
//             const l = binary_search_tree_to_string(left);
//             // display("left tree");
//             // display(value);
//             // display(l);
//             // display("end");
//             return append(l, list(value));
//         } else {
//             display("error");
//             return 1;
//         }
//     }
// }


// function insert_to_bst(bst, item) {
//     // your answer here
//     if (is_null(bst)) {
//         return make_tree(item, null, null);
//     } else {
//         const right = right_branch(bst);
//         const left = left_branch(bst);
//         const value = entry(bst);
        
//         if (item > value) {
//             return make_tree(value, left, insert_to_bst_to_bst(right, item));
//         } else {
//             // item < head(bst)
//             return make_tree(value, insert_to_bst_to_bst(left, item), right);
//         }
//     }
    
// }

function stream_refs(strm, n) {
    if (n === 0) {
        return head(strm);
    } else {
        return stream_refs(tail(strm)(), n - 1);
    }
}

function enum_streams(start, end) {
    return start > end
            ? "error, start > end"
            : start === end 
                ? pair(start, () => null)
                : pair(start, () => enum_streams(start + 1, end));
}

function stream_maps(strm, f) {
    return pair(f(head(strm)), () => stream_maps(tail(strm)(), f));
}

function stream_filters(strm, pred) {
    if (is_null(strm)) {
        return null;
    } else {
        return pred(head(strm)) 
                ? pair(head(strm), () => stream_filters(tail(strm)(), pred))
                : stream_filters(tail(strm)(), pred);
    }
}

function replace_stream_element(strm, old, niw) {
    if (is_null(strm)) {
        return null;
    } else {
        return head(strm) === old   
            ? pair(niw, () => replace_stream_element(tail(strm)(), old, niw))
            : pair(head(strm), () => replace_stream_element(tail(strm)(), old, niw));
    }
}

function stream_to_list(strm) {
    if (is_null(strm)) {
        return null;
    } else {
        return pair(head(strm), stream_to_list(tail(strm)()));
    }
}

function add_streamss(a, b) {
    if (is_null(a)) {
        return b;
    } else if (is_null(b)) {
        return a;
    } else {
        return pair(head(a) + head(b), () => add_streamss(tail(a)(), tail(b)()));
    }
}


function display_first_n_stream(strm, n) {
    let ptr = strm;
    while (n > 0) {
        if (is_null(ptr)) {
            break;
        }
        display(head(strm));
        strm = tail(strm)();
        n = n - 1;
    }
}

function zip_streams(a, b) {
    if (is_null(a)) {
        return b;
    }
    
    if (is_null(b)) {
        return a;
    }
    
    const v1 = head(a);
    const v2 = head(b);
    
    return pair(v1, () => pair(v2, () => zip_streams(tail(a)(), tail(b)())));
    
}

function skip_every_other_stream_element(s) {
    // bin == 0 skip
    // bin == 1 take
    function helper(s, bin) {
        if (is_null(s)) {
            return null;
        }
        
        if (bin === 0) {
            return helper(tail(s)(), 1);
        }
        
        return pair(head(s), () => helper(tail(s)(), 0));
    }
    return helper(s, 1);
}

function n_of_n_stream() {
    // YOUR SOLUTION HERE
    function helper(curr, n) {
        if (n === curr) {
            return pair(curr, () => helper(curr + 1, 1));
        } else {
            return pair(curr, () => helper(curr, n + 1));
        }
    }
    return helper(1, 1);
}

function first_n_elem_of_stream(s, k) {
    // YOUR SOLUTION HERE
    if (is_null(s)) {
        return s;
    } else if (k === 0) {
        return null;
    }
    
    return pair(head(s), ()=> shorten_stream(tail(s)(), k - 1));
}

function make_alternating_stream(s) {

    // YOUR SOLUTION HERE
    if(is_null(s)) {
        return null;
    } 
    
    const v1 = head(s);

    if(is_null(tail(s)())) {
        return pair(v1, () => null);
    }
    
    const v2 = -1 * head(tail(s)());
    return pair(v1, () => pair(v2, () => make_alternating_stream(tail(tail(s)())())));

}

function partial_sums(s) {

    // YOUR SOLUTION HERE
    function helper(s, sum) {
        if (is_null(s)) {
            return null;
        }
        
        return pair(sum + head(s), () => helper(tail(s)(), sum + head(s)));
    }
    
    return helper(s, 0);
}
const ones = pair(1, () => ones);
const twos = pair(2, () => twos);

display_first_n_stream(every_other_stream_element(zip_streams(ones, twos)), 3);


// CHEAT SHEET CREDITS @ TZU EN

//IF THIS FUCKING CRASHES AGAIN IM GONNA FUCKING
function rotate_matrix(M){
    const l= array_length(M);
    const ll= math_floor(l/2);
    
    for (let i=0; i<l; i=i+1){
        for (let j=0; j<i; j=j+1){
            let temp= M[i][j];
            M[i][j]= M[j][i];
            M[j][i]=temp;
        }
    }
    
    for (let i=0; i<l; i=i+1){
        for (let j=0; j<ll; j=j+1){
            let temp= M[i][j];
            M[i][j]= M[i][l-j-1];
            M[i][l-j-1]=temp;
        }
    }
    
}
rotate_matrix(A);
A;


function stream_pairs(s) {
return is_null(s)
? null
: stream_append(
stream_map(
sn => pair(head(s), sn),
stream_tail(s)),
stream_pairs(stream_tail(s)));
}

ints = streams(1, 2, 3, 4, 5);
//=====================================================================
//=====================================================================
// TASK 3
function alt_column_matrix(R, C) {
const M = [];
for (let r = 0; r < R; r = r + 1) {
M[r] = [];
}
let count = 1;
for (let c = 0; c < C; c = c + 1) {
if (c % 2 === 0) {
for (let r = 0; r < R; r = r + 1) {
M[r][c] = count;
count = count + 1;
}
} else {
for (let r = R - 1; r >= 0; r = r - 1) {
M[r][c] = count;
count = count + 1;
}
}
}
return M;
}
//=====================================================================


////////////////////////////////////////////////////////////////////////////////
// QUESTION 1 //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function delta_encode(L) {
    if (is_null(L)) {
        return null;
    }
    const sp = map(x => x - head(L), tail(L));
    return pair(head(L), delta_encode(sp));
}

////////////////////////////////////////////////////////////////////////////////
// QUESTION 2 //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function delta_decode(D) {
    if (is_null(D)) {
        return null;
    }
    const wish = delta_decode(tail(D));
    return map(x => x + head(D), pair(0, wish));
}

////////////////////////////////////////////////////////////////////////////////
// QUESTION 3 //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function runlength_encode(L) {
    if (is_null(L) || is_null(tail(L))) {
        return L;
    }
    const curr = head(L);
    const wish = runlength_encode(tail(L));
    // CASE 2
    if (curr === head(wish)) { // wish has at least 1 item
        const new_pair = pair(curr, 2);
        return pair(new_pair, tail(wish));
    }
    // CASE 3: head of wish is a pair
    if (is_pair(head(wish)) && head(head(wish)) === curr) {
        const pr = head(wish);
        const quantity = tail(pr);
        set_tail(pr, quantity + 1);
        return wish;
    }
    // CASE 1: pairing curr in front of wish
    return pair(curr, wish);
}

////////////////////////////////////////////////////////////////////////////////
// QUESTION 4 //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function runlength_decode(R) {
    const RA = list_to_array(R);
    const res = [];
    for (let i = 0; i < array_length(RA); i = i + 1) {
        if (is_number(RA[i])) {
            res[array_length(res)] = RA[i];
        } else {
            // RA[i] is a pair
            const item = head(RA[i]);
            const quantity = tail(RA[i]);
            for (let j = 0; j < quantity; j = j + 1) {
                res[array_length(res)] = item;
            }
        }
    }
    return array_to_list(res);
}

function list_to_array(xs) {
    const res = [];
    let current_pair = xs;
    while (!is_null(current_pair)) {
        res[array_length(res)] = head(current_pair);
        current_pair = tail(current_pair);
    }
    return res;
}

function array_to_list(arr) {
    let res = null;
    const len = array_length(arr);
    for (let i = 1; i <= len; i = i + 1) {
        res = pair(arr[len - i], res);
    }
    return res;
}
    //===============================================================
// TASK 1A
//===============================================================
function make_k_list(k, d) {
    if (d === 0) {
        return 0;
        } else {
            let klist = null;
            for (let i = 0; i < k; i = i + 1) {
            klist = pair(make_k_list(k, d - 1), klist);
            }
            return klist;
            }
    }
function route_distance(mat, route) {
function add_dist(rou) {
if (is_null(rou) || is_null(tail(rou))) {
return 0;
} else {
return mat[head(rou)][head(tail(rou))] + add_dist(tail(rou));
}
}
return add_dist(route);
}
//===============================================================
// TASK 2B
//===============================================================
function shortest_paper_route(n, mat, start) {
// You can keep, modify or remove the permutations function.
function permutations(ys) {
return is_null(ys)
? list(null)
: accumulate(append, null,
map(x => map(p => pair(x, p),
permutations(remove(x, ys))),
ys));
}
const others = remove(start, enum_list(0, n - 1));
const routes = permutations(others);
let min_dist = Infinity;
let min_route = null;
for (let p = routes; !is_null(p); p = tail(p)) {
const pp_route = pair(start, append(head(p), list(start)));
const route_dist = route_distance(mat, pp_route);
if (route_dist < min_dist) {
min_dist = route_dist;
min_route = pp_route;
} else { }
}
return pair(min_route, min_dist);
}

function accumulate_tree(f, op, initial, tree) {
return accumulate(
(x, ys) => !is_list(x)
? op(f(x), ys)
: op(accumulate_tree(f, op, initial, x), ys),
initial,
tree );
}

function insert(x, xs) {
return is_null(xs)
? list(x)
: x <= head(xs)
? pair(x, xs)
: pair(head(xs), insert(x, tail(xs)));
}
function insertion_sort(xs) {
return is_null(xs)
? xs
: insert(head(xs), insertion_sort(tail(xs)));
}

function smallest(xs) {
return accumulate((x, y) => x < y ? x : y,
head(xs), tail(xs));
}
function selection_sort(xs) {
if (is_null(xs)) {
return xs;
} else {
const x = smallest(xs);
return pair(x, selection_sort(remove(x, xs)));
}
}

function merge_sort(xs) {
if (is_null(xs) || is_null(tail(xs))) {
return xs;
} else {
const mid = middle(length(xs));
return merge(merge_sort(take(xs, mid)),
merge_sort(drop(xs, mid)));
}
}

function merge(xs, ys) {
if (is_null(xs)) {
return ys;
} else if (is_null(ys)) {
return xs;
} else {
const x = head(xs);
const y = head(ys);
return x < y
? pair(x, merge(tail(xs), ys))
: pair(y, merge(xs, tail(ys)));
}
}

function count_data_items(tree) {
return is_null(tree)
? 0
: ( is_list(head(tree))
? count_data_items(head(tree))
: 1 )
+
count_data_items(tail(tree));

function scale_tree(tree, k) {
return map(sub_tree =>
!is_list(sub_tree)
? k * sub_tree
: scale_tree(sub_tree, k),
tree);





function partial_sums(s) {
    let acc = 0;
    // YOUR SOLUTION HERE
    function helper(s) {
        acc = head(s) + acc;
        return pair(acc, 
                    () => helper(stream_tail(s)));
    }
    return helper(s);
}

function partial_sums2(s) {
    return pair(head(s), 
    () => stream_map(x => x + head(s), partial_sums2(stream_tail(s))));

}

function sum_odd(n) {
    const term = x => x;
    const next = x => x + 2;
    return sum(term, 1, next, n * 2);


function sum(term, a, next, b) {
    return a > b
       ? 0
       : term(a) + sum(term, next(a), next, b);
}

function prime_only(xs) {
    function check(n) {
        
        function check_helper(n, d) {
            return n === d
            ? true
            : n % d === 0
            ? false
            : check_helper(n, d + 1);
        }
    
    return n === 1 ? false : check_helper(n, 2);
    
    }  
    
    return filter( check , xs);
}


// Calls display on every item in the tree xs.
function traverse(xs) {
    // Modify this function to work on trees.
    if (is_null(xs)) {
        return null;
    } else {
        return is_list(head(xs))
        ? pair(traverse(head(xs)), traverse(tail(xs)))
        : pair(display(head(xs)), traverse(tail(xs)));
    }
}

function middle(n) {
return math_floor(n / 2);
}

// put the first n elements of xs into a list
function take(xs, n) {
    return n === 0
    ? null 
    : pair(head(xs), take(tail(xs), n - 1));
}

// drop the first n elements from list, return rest
function drop(xs, n) {
    return n === 0
    ? xs
    : drop(tail(xs), n - 1);
}

drop(list(1,2,3,4,5), 2); 

function min(a, b) {
    return a < b ? a : b;
}

// given a non-empty list xs, returns the smallest item in xs
function smallest(xs) {
    return is_null(xs)
    ? null 
    : length(xs) === 1
    ? head(xs)
    : head(xs) < head(tail(xs))
    ? smallest(remove(head(tail(xs)), xs))
    : smallest(remove(head(xs), xs));
}

// school method:

function smallest(xs) {
    return is_null(tail(xs)) ? head(xs) : min(head(xs), smallest(tail(xs)));
}


// removes the first instance of x from xs
function remove(x, xs) {
    return is_null(xs)
    ? null 
    : head(xs) === x
    ? tail(xs)
    : pair(head(xs), remove(x, tail(xs)));
} 

function dot_product(A, B) {
   const len = array_length(B);
   let answer = 0;
   for(let i = 0; i < len; i = i + 1) {
       answer = answer + A[i] * B[i];
   }
   return answer;
   
}


function accumulate_array(op, init, A) {
    const len = array_length(A);
    let result = init;
    for (let i = 0; i < len; i = i + 1) {
        result = op(result, A[i]);
    }
    return result;
}

function filter_array(pred, A) {
    let result = [];
    let len = array_length(A);
    let j = 0;
    for (let i = 0 ; i < len ; i = i + 1) {
        if (pred(A[i])) {
            result[j] = A[i];
            j = j + 1;
        }
        
    }
    return result;
}

function transpose(M) {
    let result = [];
    for (let r = 0 ; r < array_length(M[0]) ; r = r + 1) {
        result[r] = [];
        for (let c = 0 ; c < array_length(M) ; c = c + 1) {
            result[r][c] = M[c][r];
        }
        
    }
    return result;
}

function search_cond(A, cond) {
    let result = 0;
    let len = array_length(A);
    for (let i = 0 ; i < len && cond(A[i]) === false  ; i = i + 1) {
        result = i + 1;
    }
    return result < len
    ? result
    : -1;
}

For example:

const A = [1,2,3,4,5];

search_cond(A, x => x % 2 === 0);
// should return 1, which is the position of the first even element 2.

search_cond(A, x => x > 9);
// should return -1.


function insert(A, pos, x) {
    let len = array_length(A);
    for (let i = len ; i > pos ; i = i - 1) {
        A[i] = A[i - 1];
    }
    A[pos] = x;
}

function insertion_sort(A) {
    let len = array_length(A);
    let result = [];
    result[0] = A[0];
    for (let i = 1 ; i < len ; i = i + 1) {
        if (search_cond(result, x => x > A[i]) !== -1) {
            insert(result, search_cond(result, x => x > A[i]), A[i]);
        } else {
            result[i] = A[i];
        }
    }
    return result;
}

function shorten_stream(s, k) {
    if (k === 0) {
        return null;
    }
    else if ( is_null(s)) { // k >= length of s
        return s;
    }
    else {
        return pair(head(s), () => shorten_stream(stream_tail(s), k - 1));
    }
}


function alternating() {
   return pair(1,
                () => pair(-1, 
                            () => alternating()));
}

const alternating_ones = alternating();


function make_alternating_stream(s) {
    return pair(head(s),
            () => pair(-head(stream_tail(s)),
            () => make_alternating_stream(stream_tail(stream_tail(s)))));
}

function zip_streams(s1, s2) {
    return is_null(s1)
    ? s2
    :is_null(s2)
    ? s1
    : pair(head(s1), () => pair(head(s2), 
                     () => zip_streams(stream_tail(s1), stream_tail(s2))));
}

function every_other(s) {
    return pair(head(s), () => every_other(stream_tail(stream_tail(s))));
}


function partial_sums(s) {
    return pair(head(s), 
    () => stream_map(x => x + head(s), partial_sums(stream_tail(s))));

}

// TASK 1

function d_split_list(xs) {
    let pointer = xs;
   const middle = math_ceil(length(xs)/2);
   for (let i = 1 ; i < middle ; i = i + 1) {
       pointer = tail(pointer);
   }
   const back = tail(pointer);
   set_tail(pointer, null);
   return pair(xs, back);
}

// TEST:
// const my_list1 = list(1, 2, 3, 4, 5, 6);
// const my_list2 = list(5, 4, 3, 2, 1);
// d_split_list(my_list1);
// d_split_list(my_list2);

// TASK 2
 

function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    }
    else if (is_null(ys)) {
        return xs;
    }
    else {
        if (head(xs) < head(ys)) {
            set_tail(xs, d_merge(tail(xs), ys));
            return xs;
            
        } else {
            set_tail(ys, d_merge(xs, tail(ys)));
            return ys;
        }
    }
}

// TEST:
const my_list1 = list(2, 4, 5, 9);
const my_list2 = list(3, 5, 8);
d_merge(my_list1, my_list2);


function d_merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const split = d_split_list(xs);
        return d_merge(d_merge_sort(head(split)), d_merge_sort(tail(split)));
    }

}

// TEST:
const my_list = list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6);
d_merge_sort(my_list);


function is_entry(key, dict) {
return accumulate( (x, y) => (head(x) === key) || y
,
false ,
dict );
}

function remove_entry(key, dict) {
return filter( x => head(x) !== key
,
dict );
}

function circular_left_shift(xs) {
if (is_null(xs)) {
return xs;
} else {
// Solution 1:
return reverse(pair(head(xs), reverse(tail(xs))));
// Solution 2:
return accumulate(pair, list(head(xs)), tail(xs));
// Solution 3:
return accumulate((x, y) => is_null(y)
? list(x, head(xs)) : pair(x, y),
null, tail(xs));
// Solution 4:
return is_null(tail(xs))
? xs
: pair(head(tail(xs),
circular_left_shift(pair(head(xs),
tail(tail(xs)))));
}
}

function circular_right_shift(xs) {
if (is_null(xs)) {
return xs;
} else {
// Solution 1:
const rev = reverse(xs);
return pair(head(rev), reverse(tail(rev)));
// Solution 2:
if (is_null(tail(xs))) {
return xs;
} else {
const wish = circular_right_shift(tail(xs));
return pair(head(wish), pair(head(xs), tail(wish)));
}
}
}

accumulate((x, ys) => circular_left_shift(pair(x, ys)), null, xs);

function max_tree(tree) {
return is_null(tree)
? 0
: is_list(head(tree))
? math_max(max_tree(head(tree)), max_tree(tail(tree)))
: math_max(head(tree), max_tree(tail(tree)));
}

function alt_column_matrix(R, C) {
    // Initialise the whole r by c matrix
    const res = [];
    for (let i = 0; i < R; i = i + 1) {
        res[i] = [];
    }
    
    function next(r, c) {
        if (c % 2 === 0 && r < R - 1) {
            return pair(r + 1, c);
        }
        if (c % 2 === 0 && r === R - 1) {
            return pair(r, c + 1);
        }
        if (c % 2 === 1 && r > 0) {
            return pair(r - 1, c);
        }
        if (c % 2 === 1 && r === 0) {
            return pair(r, c + 1);
        }
    }
    
    const total_iterations = R * C;
    let curr = pair(0, 0);
    for (let i = 1; i <= total_iterations; i = i + 1) {
        const r = head(curr);
        const c = tail(curr);
        res[r][c] = i;
        curr = next(r, c);
    }
    return res;
}

function make_matrix_with_increasing_numbers(R, C) {
    // Initialise the matrix
    const arr = [];
    for (let i = 0; i < R; i = i + 1) {
        arr[i] = [];
    }
    
    // Fill numbers
    for (let i = 0; i < R * C; i = i + 1) {
        const index = math_floor(i / C);
        const current_row = arr[index];
        const len = array_length(current_row);
        current_row[len] = i + 1;
    }
    return arr;
}

make_matrix_with_increasing_numbers(3, 4);

//  returns [[1, 2, 3, 4], 
//           [5, 6, 7, 8], 
//           [9, 10, 11, 12]]



function binary_search_tree_to_string(bst) {
    return !is_tree(bst)
    ? binary_search_tree_to_string(
        make_tree(bst, make_empty_tree(), make_empty_tree()))
    : is_empty_tree(bst)
    ? ""
    : is_empty_tree(left_branch(bst)) && is_empty_tree(right_branch(bst))
    ? entry(bst) + "; "
    : binary_search_tree_to_string(left_branch(bst)) + entry(bst) + "; " 
    + binary_search_tree_to_string(right_branch(bst));
}

function find(bst, name) {
    return is_empty_tree(bst)
    ? false
    : name === entry(bst)
    ? true
    : find(left_branch(bst), name) || find(right_branch(bst), name);
}


function insert(bst, item) {
    return is_empty_tree(bst)
    ? make_tree(item, make_empty_tree(), make_empty_tree())
    : item < entry(bst)
    ? make_tree(entry(bst), insert(left_branch(bst), item), 
                            right_branch(bst))
    : make_tree(entry(bst), left_branch(bst), 
                insert(right_branch(bst), item)); // when item > entry(bst)
}


function binary_search_tree_to_string(bst) {
    return is_empty_tree(bst)
    ? ""
    : binary_search_tree_to_string(left_branch(bst)) + entry(bst) + "; " 
    + binary_search_tree_to_string(right_branch(bst));
}


// Test
//binary_search_tree_to_string(insert(make_empty_tree(), "x"));
// Should produce "x; "

const best = accumulate((item, bst) => insert(bst, item),
                       make_empty_tree(),
                       list("g", "a", "r", "x", "p"));
binary_search_tree_to_string(best);
// Should produce "a; g; p; r; x; "

const cadet_names_with_aaaaron =  insert(cadet_names, "AAAARON NORAAAA");
binary_search_tree_to_string(cadet_names_with_aaaaron);
// Should produce "AAAARON NORAAAA; ..."

function partition(xs, p) {
    function helper(lst, less, more) {
        return is_null(lst)
        ? pair(less, more)
        : head(lst) <= p
        ? helper(tail(lst), pair(head(lst), less), more)
        : helper(tail(lst), less, pair(head(lst), more)); //head(lst) > p
        }
        return helper(xs, null, null);
}

function quicksort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
    const pivot = head(xs);
    const smaller = head(partition(tail(xs), head(xs)));
    const bigger = tail(partition(xs, head(xs)));
    return append(quicksort(smaller), pair(pivot, quicksort(bigger)));
    }
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);







