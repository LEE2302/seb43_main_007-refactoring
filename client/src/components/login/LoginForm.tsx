import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/img/logo2.png";
import validFunction from "../../util/signinValidFunc";
import LoginModal from "./LoginModal";
import { LoginTypes } from "./LoginType";
import { loginPost } from "../../api/axios";
// import { RootState } from "../../store/store";
import { setMemberId } from "../../reducers/memberIdSlice";

function LoginForm() {
   const dispatch = useDispatch();
   // const memberId = useSelector((state: RootState) => state.memberId);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginTypes>();
   const [isFailModalOpen, setIsFailModalOpen] = useState(false);
   const [failMessage, setFailMessage] = useState({
      text1: "로그인에 실패했습니다.",
      text2: "아이디와 비밀번호를 확인해주세요.",
   });
   setFailMessage({
      text1: "로그인에 실패했습니다.",
      text2: "아이디와 비밀번호를 확인해주세요.",
   });
   // 페이지 입장할 때 첫 input에 focus
   const inputRef = useRef<HTMLInputElement | null>(null);
   const { ref } = register("email");
   useEffect(() => {
      if (inputRef.current !== null) inputRef.current.focus();
   }, []);

   const onSubmit: SubmitHandler<LoginTypes> = async (data) => {
      // 로그인 요청 함수 자리
      // 로그인시 home화면으로 navigate
      const response = await loginPost(data);
      console.log(response);
      // access 토큰 저장, memberid 저장, 로그인상태 변경
      // if(성공시) {
      //   memberID 전역상태 설정
      //   access 토큰은 쿠키에저장
      //   home으로 이동
      // }

      // 로그인 실패시 modal창으로 로그인실패 에러 메시지 띄우기

      // 서버와 통신이 원활하지 않을 때
      // setFailMessage({
      //    text1: "서버와 통신이 원활하지 않습니다.",
      //    text2: "다시 시도해 주세요.",
      // });
      // setIsFailModalOpen(true);

      // 아이디 비번이 잘못됐을 때
      // setFailMessage({
      //    text1: "로그인에 실패했습니다.",
      //    text2: "아이디와 비밀번호를 확인해주세요.",
      // });
      // setIsFailModalOpen(true);
      // console.log(data);
   };

   return (
      <LoginFormContainer onSubmit={handleSubmit(onSubmit)}>
         <img className="logo" src={logo} alt="logo" />
         <div className="input-box">
            <input
               placeholder="이메일"
               className="email-input"
               {...register("email", {
                  required: true,
                  validate: validFunction.validEmail,
               })}
               ref={(e) => {
                  ref(e);
                  inputRef.current = e;
               }}
            />
            {errors.email && (
               <span className="error-message">
                  이메일 형식으로 입력해주세요
               </span>
            )}
         </div>
         <div className="input-box">
            <input
               placeholder="비밀번호"
               type="password"
               className="password-input"
               {...register("password", {
                  required: true,
                  validate: validFunction.validPassword,
               })}
            />
            {errors.password && (
               <span className="error-message">8자 이상 입력해주세요</span>
            )}
         </div>
         <button type="submit" className="submit">
            LOGIN
         </button>
         <LoginModal
            isOpen={isFailModalOpen}
            setIsOpen={setIsFailModalOpen}
            message={failMessage}
         />
      </LoginFormContainer>
   );
}

export default LoginForm;

const LoginFormContainer = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 35%;
   margin-bottom: 1%;
   .logo {
      position: absolute;
      width: 200px;
      height: 200px;
      top: -100px;
      left: 50%;
      transform: translate(-50%, 0);
   }
   .input-box {
      width: 70%;
      height: 70px;
      .email-input,
      .password-input {
         width: 100%;
         height: 40px;
         font-size: var(--font-base);
         padding-left: 2%;
         margin-bottom: 5px;
         border: 0.5px solid var(--second-color3);
         border-radius: 5px;
      }
      .error-message {
         font-size: var(--font-small);
         color: red;
      }
   }
   .submit {
      width: 70%;
      height: 40px;
      font-size: var(--font-base);
      color: white;
      cursor: pointer;
      background-color: var(--second-color3);
      border: 2px outset var(--second-color3);
      border-radius: 5px;
      transition-duration: 0.2s;
      &:hover {
         background-color: var(--third-color3);
         border-color: var(--third-color3);
         transition-duration: 0.2s;
      }
   }
`;
