<!-- Video Section -->
    <section class="video-section" id="video">
      <div class="container">
        <!-- Custom Video Player -->
        <div class="video-container animate-on-scroll">
          <div class="apc-player" id="apcPlayer3">
            <div class="apc-seek-flash left" id="flashLeft3">
              <i class="fas fa-backward"></i>
            </div>
            <div class="apc-seek-flash right" id="flashRight3">
              <i class="fas fa-forward"></i>
            </div>
            <div class="apc-spinner" id="apcSpinner3">
              <div class="apc-spinner-ring"></div>
            </div>
            <video id="apcVideo3">
              <source src="./videos/Video_Three.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div class="apc-play-overlay" id="apcOverlay3">
              <div class="apc-big-play"><i class="fas fa-play"></i></div>
            </div>
            <div class="apc-controls" id="apcControls3">
              <div class="apc-progress-wrap" id="apcSeek3">
                <div class="apc-progress-bg">
                  <div class="apc-buffered" id="apcBuffered3"></div>
                  <div class="apc-played" id="apcPlayed3"></div>
                </div>
                <div class="apc-progress-thumb" id="apcThumb3"></div>
              </div>
              <div class="apc-bottom">
                <button class="apc-btn" id="apcPlayBtn3">
                  <i class="fas fa-play" id="apcPlayIcon3"></i>
                </button>
                <div class="apc-volume-group">
                  <button class="apc-btn" id="apcMuteBtn3">
                    <i class="fas fa-volume-high" id="apcVolIcon3"></i>
                  </button>
                  <input
                    type="range"
                    class="apc-volume-slider"
                    id="apcVol3"
                    min="0"
                    max="1"
                    step="0.02"
                    value="1"
                  />
                </div>
                <div class="apc-time">
                  <span id="apcCur3">0:00</span> /
                  <span id="apcDur3">0:00</span>
                </div>
                <div class="apc-spacer"></div>
                <button class="apc-speed" id="apcSpeedBtn3">1×</button>
                <div class="apc-speed-menu" id="apcSpeedMenu3">
                  <div class="apc-speed-opt" data-speed="0.5">0.5×</div>
                  <div class="apc-speed-opt" data-speed="0.75">0.75×</div>
                  <div class="apc-speed-opt active" data-speed="1">1×</div>
                  <div class="apc-speed-opt" data-speed="1.25">1.25×</div>
                  <div class="apc-speed-opt" data-speed="1.5">1.5×</div>
                  <div class="apc-speed-opt" data-speed="2">2×</div>
                </div>
                <button class="apc-btn" id="apcFsBtn3">
                  <i class="fas fa-expand" id="apcFsIcon3"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>