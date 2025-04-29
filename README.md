# API 실습

## 사용한 API

- [한국관광공사\_고캠핑 정보 조회서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101933)
- [OpenWeather API](https://openweathermap.org/api)

## Tanstack Query 살펴보기

문서: https://tanstack.com/query/latest

### Overview

**fetching, caching, synchronizing** and **updating server state**를 쉽게 할 수 있도록 도와줌

**기존 문제**:

1. 캐싱 (언제, 얼마큼 캐싱할 건지 브라우저 Storage, Context API 등을 활용하여 관리)
2. 중복되는 API 요청
3. 최신 데이터 가져오기 (언제 데이터가 out of date 되는지 알고 적절한 타이밍에 다시 데이터를 불러와야 함)
4. 페이지네이션과 지연 로딩 구현
5. 서버 메모리와 GC 관리

**TanStack Query가 제공하는 것들**:

1. 간결한 TanStack Query 코드
2. 서버 구조를 바꾸지 않고 신규 기능을 추가하기 쉬움
3. 사용자 상호작용에 따라 빠르게 대응 가능
4. 네트워크 대역폭, 메모리 사용 최적화

### ⭐ 코드로 변화 살펴보기

#### **기존 방식 useState + useEffect**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

#### **TanStack Query 방식**

```jsx
import { useQuery } from "@tanstack/react-query";

function TodoList() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("/api/todos");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

#### **주요 개선 사항**

1. **상태 관리 간소화**
   1. 여러 개의 useState가 필요 없어짐
   2. isLoading, error, data 상태를 자동으로 관리
2. **자동 캐싱과 재요청 처리**

   1. 여러 컴포넌트에서 동일한 데이터(동일한 queryKey) 요청시 자동으로 캐시된 데이터 사용

   ```jsx
   // 여러 컴포넌트에서 동일한 데이터 요청시
   function TodoList1() {
     // 캐시된 데이터를 사용, 중복 요청 방지
     const { data: todos } = useQuery({
       queryKey: ["todos"],
       queryFn: fetchTodos,
     });
   }

   function TodoList2() {
     // 동일한 queryKey를 사용하면 자동으로 캐시된 데이터 사용
     const { data: todos } = useQuery({
       queryKey: ["todos"],
       queryFn: fetchTodos,
     });
   }
   ```

3. **데이터 업데이트(Mutation) 처리 간소화** `invalidateQueries`

   ```jsx
   function AddTodo() {
     const queryClient = useQueryClient();
     const mutation = useMutation({
       mutationFn: (newTodo) => {
         return fetch("/api/todos", {
           method: "POST",
           body: JSON.stringify(newTodo),
         });
       },
       // 성공시 todos 쿼리 자동 갱신
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["todos"] });
       },
     });

     return (
       <form
         onSubmit={(e) => {
           e.preventDefault();
           mutation.mutate({ title: "New Todo" });
         }}
       >
         <button type="submit">Add Todo</button>
       </form>
     );
   }
   ```

4. **의존성 있는 쿼리 처리** `enabled`

   ```jsx
   function UserTodos() {
     // 사용자 정보 조회
     const { data: user } = useQuery({
       queryKey: ["user"],
       queryFn: fetchUser,
     });

     // 사용자의 할일 목록 조회 (사용자 정보 의존)
     const { data: todos } = useQuery({
       queryKey: ["todos", user?.id],
       queryFn: () => fetchUserTodos(user.id),
       // user가 있을 때만 실행
       enabled: !!user,
     });
   }
   ```

5. **자동 에러 재시도**

   ```jsx
   function TodoList() {
     const { data: todos } = useQuery({
       queryKey: ["todos"],
       queryFn: fetchTodos,
       // 에러 발생시 자동 재시도 설정
       retry: 3,
       retryDelay: 1000,
     });
   }
   ```

### 장점 요약

1. **코드량 감소**: 상태 관리, 로딩, 에러 처리 등의 보일러플레이트 코드가 크게 줄어듭니다.
2. **자동화된 데이터 관리**: 캐싱, 재요청, 에러 처리 등을 자동으로 처리합니다.
3. **성능 최적화**: 중복 요청 방지, 캐싱을 통한 불필요한 네트워크 요청 감소
4. **데이터 동기화**: 여러 컴포넌트 간 데이터 동기화가 자동으로 이루어집니다.
5. **개발자 경험 향상**: 복잡한 상태 관리 로직을 작성할 필요가 없어 개발 생산성이 향상됩니다.
