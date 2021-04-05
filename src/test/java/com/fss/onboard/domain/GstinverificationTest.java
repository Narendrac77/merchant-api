package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class GstinverificationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gstinverification.class);
        Gstinverification gstinverification1 = new Gstinverification();
        gstinverification1.setId(1L);
        Gstinverification gstinverification2 = new Gstinverification();
        gstinverification2.setId(gstinverification1.getId());
        assertThat(gstinverification1).isEqualTo(gstinverification2);
        gstinverification2.setId(2L);
        assertThat(gstinverification1).isNotEqualTo(gstinverification2);
        gstinverification1.setId(null);
        assertThat(gstinverification1).isNotEqualTo(gstinverification2);
    }
}
