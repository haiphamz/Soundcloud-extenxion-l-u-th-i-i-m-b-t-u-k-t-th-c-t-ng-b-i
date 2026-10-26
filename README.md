# SoundCloud Cue Manager & Auto Crossfader (Pastel Pink Edition)

Extension Chrome Manifest V3 hỗ trợ **lưu điểm Bắt Đầu (Start Cue) & Kết Thúc (Stop Cue) cho từng bài hát**, tự động tua khi phát lại bài đó, **Xuất / Nhập file JSON ra ngoài máy tính**, **Chỉnh sửa các bài đã lưu**, và giao diện **Trắng Hồng Pastel tối giản, thanh lịch (không dùng icon emoji)**.

---

## Tính năng nổi bật

1. **Giao diện Trắng Hồng Pastel thanh lịch (Không icon emoji):**
   - Tông màu: Trắng sữa kết hợp hồng pastel dịu nhẹ (`#fff8f9`, `#ffe5ec`, `#ffccd5`, `#ff758f`, `#ff4d6d`).
   - Bỏ toàn bộ các icon emoji, giữ phong cách typography hiện đại, sạch sẽ và dễ nhìn.
   - Các ô nhập dữ liệu và nút bấm đều được đồng bộ tông màu hồng pastel.

2. **Hiển thị thời gian định dạng Phút:Giây (1:10):**
   - Mốc thời gian được hiển thị và nhập dưới dạng `phút:giây` (ví dụ `1:10`, `0:15`, `3:45`) thay vì số giây khó hình dung.
   - Hỗ trợ nhập linh hoạt cả chuỗi `1:10` lẫn số giây nguyên `70`.

3. **Cơ chế Chỉnh Sửa bài hát đã lưu (Edit Mode):**
   - **Trên Menu Popup:** Mỗi bài có nút **Sửa**. Khi bấm vào, bài hát sẽ chuyển sang ô nhập `Bắt đầu` và `Kết thúc` để người dùng thay đổi mốc phát, sau đó chọn **Lưu thay đổi** hoặc **Hủy**.
   - **Trên thanh Cue Bar (Web SoundCloud):** Khi phát một bài đã lưu, thanh công cụ tự nạp mốc cũ. Bạn có thể sửa trực tiếp và bấm **Cập nhật bài này**.

4. **Xuất / Nhập file JSON ra ngoài máy tính:**
   - **Nút Xuất file (.json):** Tải toàn bộ danh sách các bài hát đã lưu về máy tính chỉ với 1 click (`soundcloud_cues_YYYY-MM-DD.json`).
   - **Nút Nhập file (.json):** Chọn file từ máy tính để phục hồi hoặc nhập danh sách bài hát vào tiện ích bất kỳ lúc nào.

5. **Lưu Data từng bài (Start Cue & Stop Cue):**
   - **Start Cue:** Tự động tua qua đoạn dạo đầu khi bài hát bắt đầu phát.
   - **Stop Cue:** Định mốc thời gian để chuyển sang bài tiếp theo mà không bị gián đoạn (0ms delay).

---

## Hướng dẫn sử dụng

### 1. Trên trang web SoundCloud:
Ở góc dưới bên phải màn hình có khung điều khiển màu hồng pastel:
- Bấm **Lấy giờ** ở ô *Bắt đầu* để lấy mốc thời gian hiện tại của bài (hoặc gõ ví dụ `0:30`).
- Bấm **Lấy giờ** ở ô *Kết thúc* để lấy mốc chuyển bài (hoặc gõ ví dụ `3:15`).
- Bấm **Lưu bài hát** / **Cập nhật bài này**.
- Bấm **Xuất file** để tải ngay file backup về máy tính.

### 2. Trên Menu Popup (Góc trên trình duyệt Chrome):
- Bấm vào biểu tượng tiện ích:
  - **Sửa:** Thay đổi trực tiếp mốc bắt đầu/kết thúc của bài hát đã lưu.
  - **Xóa:** Xóa từng bài riêng lẻ hoặc **Xóa tất cả**.
  - **Xuất file (.json):** Tải file dữ liệu về máy.
  - **Nhập file (.json):** Tải file dữ liệu từ máy tính lên tiện ích.

---

## Cách nạp cập nhật vào trình duyệt:
1. Mở trang `chrome://extensions/`
2. Bật **Developer mode** (Chế độ nhà phát triển) nếu chưa bật.
3. Bấm nút **Reload (Biểu tượng xoay tròn)** tại tiện ích SoundCloud Cue Manager.
4. Mở tab SoundCloud và nhấn **F5** để cập nhật toàn bộ giao diện và tính năng mới!
