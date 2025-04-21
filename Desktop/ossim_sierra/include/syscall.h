/*
 * Copyright (C) 2025 pdnguyen of HCMC University of Technology VNU-HCM
 */

/* Sierra release
 * Source Code License Grant: The authors hereby grant to Licensee
 * personal permission to use and modify the Licensed Source Code
 * for the sole purpose of studying while attending the course CO2018.
 */

 #include "common.h" // Bao gồm các định nghĩa chung được sử dụng trong toàn bộ dự án

 // Cấu trúc lưu trữ trạng thái các thanh ghi trong ngữ cảnh của một syscall
 struct sc_regs {
         uint32_t a1; // Tham số đầu vào 1 cho syscall
         uint32_t a2; // Tham số đầu vào 2 cho syscall
         uint32_t a3; // Tham số đầu vào 3 cho syscall
         uint32_t a4; // Tham số đầu vào 4 cho syscall
         uint32_t a5; // Tham số đầu vào 5 cho syscall
         uint32_t a6; // Tham số đầu vào 6 cho syscall
 
         /*
          * orig_ax được sử dụng để lưu:
          * - Số hiệu syscall (syscall number) khi thực hiện syscall
          * - Mã lỗi (error_code) được CPU lưu trữ khi xảy ra lỗi hoặc ngoại lệ
          * - Số ngắt (interrupt number) khi có ngắt thiết bị
          */
         uint32_t orig_ax;
 
         int32_t flags; // Cờ trạng thái liên quan đến syscall
 };
 
 /* 
  * Bảng syscall (sys_call_table) và kích thước của nó (syscall_table_size)
  * được sử dụng để ánh xạ số hiệu syscall với hàm xử lý tương ứng.
  */
 extern const char* sys_call_table[]; // Bảng ánh xạ syscall
 extern const int syscall_table_size; // Kích thước của bảng syscall
 
 /*
  * Hàm syscall:
  * - Thực hiện lời gọi hệ thống dựa trên số hiệu syscall (nr) và tham số trong regs.
  * - caller: Tiến trình thực hiện syscall.
  * - nr: Số hiệu syscall.
  * - regs: Trạng thái các thanh ghi.
  */
 int syscall(struct pcb_t*, uint32_t, struct sc_regs*);
 
 /*
  * Hàm libsyscall:
  * - Thực hiện lời gọi hệ thống từ không gian người dùng.
  * - caller: Tiến trình thực hiện syscall.
  * - Các tham số khác là các giá trị truyền vào syscall.
  */
 int libsyscall(struct pcb_t*, uint32_t, uint32_t, uint32_t, uint32_t);
 
 /*
  * Hàm __sys_ni_syscall:
  * - Hàm mặc định cho các syscall không được triển khai (Not Implemented).
  * - Trả về lỗi khi số hiệu syscall không hợp lệ hoặc chưa được hỗ trợ.
  */
 int __sys_ni_syscall(struct pcb_t*, struct sc_regs*);