package com.ssafy.ohmarking.api.controller;
import com.ssafy.ohmarking.api.request.OMRRegisterDto;
import com.ssafy.ohmarking.api.request.OMRUpdateDto;
import com.ssafy.ohmarking.api.service.OMRService;
import com.ssafy.ohmarking.common.model.JsonDto;
import com.ssafy.ohmarking.common.model.Response;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/omr")
public class OMRController {
    private final OMRService omrService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @ApiOperation(value = "OMR 등록", notes = "새로운 OMR 카드를 등록한다.")
    public Response<?> registerOMR(@RequestBody OMRRegisterDto omrRegisterDto) {
        return new Response<>(true, 201, "OMR 등록 성공", omrService.registerOMR(omrRegisterDto));
    }
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/favorites/{omrId}")
    @ApiOperation(value = "OMR ID로 즐겨찾기 note 조회", notes = "OMR ID로 즐겨찾기 note 조회")
    public Response<?> getFavoritesByOMRId(@PathVariable Long omrId) {
        return new Response<>(true, 200, "OMR ID로 favorites 리스트 조회 성공", omrService.getFavorites(omrId));
    }


    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/color")
    @ApiOperation(value = "OMR 색상 변경", notes = "OMR 카드의 색상을 변경한다.")
    public JsonDto changeColor(@RequestHeader("authorization") String authorization, @RequestBody OMRUpdateDto omrUpdateDto) {
        omrService.changeColor(authorization.replace("Bearer ", ""), omrUpdateDto);
        return new JsonDto(true, 202, "OMR 색상 변경 성공");
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/user/{omrId}")
    @ApiOperation(value = "OMR 조회(링크 주인)", notes = "링크 주인이 OMR 카드를 조회했을 때 정보를 반환한다.")
    public Response<?> getOMR(@RequestHeader("authorization") String authorization, @PathVariable Long omrId) {
        return new Response<>(true, 200, "링크 주인 OMR 정보 조회 성공", omrService.getCardInfo(authorization.replace("Bearer ", ""), omrId));
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/guest/{omrId}")
    @ApiOperation(value = "OMR 조회(링크 주인이 아닐 때)", notes = "링크 주인이 아닌 사용자가 OMR 카드를 조회했을 때 정보를 반환한다.")
    public Response<?> getOMR(@PathVariable Long omrId) {
        return new Response<>(true, 200, "링크 주인이 아닐 때 OMR 정보 조회 성공", omrService.getCardInfo(omrId));
    }
}
