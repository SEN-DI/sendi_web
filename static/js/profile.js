document.querySelectorAll(".profile").forEach((profile) => {
    profile.addEventListener("click", () => {
      const profileId = parseInt(profile.getAttribute("data-id"), 10);
      if (profileId === 4) {
        window.location.href = "/calendar";
      } else {
        // 아무 것도 하지 않음 (ID가 1, 2, 3인 프로필 클릭 시)
      }
    });
  });
  