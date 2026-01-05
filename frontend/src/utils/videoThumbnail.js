export const generateThumbnail = (file, cb) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.currentTime = 2;
    video.muted = true;
    video.playsInline = true;
  
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
  
      cb(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(video.src);
    };
  };
  